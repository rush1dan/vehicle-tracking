require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    optionsSuccessStatus: 200
}

app.get('/', (req, res) => {
    res.send("Express App");
});

app.get('/healthz', (req, res) => {
    res.status(200).json('Healthy');
});

const Server = require('socket.io').Server;

const { getVehicles, connectToMongoDB, addVehicle, removeVehicle, updateVehicle } = require('./lib/mongodb')
const { processVehiclesListData } = require('./lib/utils');

app.get('/socket', cors(corsOptions), (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            cors: corsOptions
        });
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log('Server: Connection Established');

            socket.on('request-data', async (userId) => {
                console.log('Server: Received Initial Data Request From User: ', userId);
                const vehicle_data = processVehiclesListData(await getVehicles(userId));
                socket.join(userId);    //for bradcasting to only room with the provided userId
                socket.emit('serve-data', vehicle_data);
            });

            socket.on('vehicle-update', async (vehicle) => {
                console.log('Server: Detected Vehicle Update');
                const updatedVehicle = await updateVehicle(vehicle);
                socket.emit('update-vehicle', updatedVehicle);
                socket.to(updatedVehicle.user.toString()).emit('update-vehicle', updatedVehicle);   //broadcasting to room with all users with same userId i.e. same account
            });

            socket.on('vehicle-add', async (userId, vehicle) => {
                console.log('Server: Detected Vehicle Addition');
                const newVehicle = await addVehicle(userId, vehicle);   //vehicle = raw vehicle data without mongo id
                socket.emit('add-vehicle', newVehicle);
                socket.to(userId).emit('add-vehicle', newVehicle);      //broadcasting to room with all users with same userId i.e. same account
            });

            socket.on('vehicle-remove', async (vehicle) => {
                console.log('Server: Detected Vehicle Removal');
                await removeVehicle(vehicle);
                socket.emit('remove-vehicle', vehicle);
                socket.to(vehicle.user.toString()).emit('remove-vehicle', vehicle);     //broadcasting to room with all users with same userId i.e. same account
            });
        })
    }
    res.status(200).json('Socket Healthy');
    res.end();
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    connectToMongoDB(process.env.MONGODB_URL);
});