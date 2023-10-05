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

const { getVehicles, connectToMongoDB } = require('./lib/mongodb')
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
                socket.emit('serve-data', vehicle_data);
            });

            socket.on('vehicle-update', vehicle => {
                console.log('Server: Detected Input Change');
                vehicle_data[vehicle.id] = vehicle;     //Update data on the server for syncing with clients connected later (demo app) :: Update data on the database (real app)
                socket.emit('update-vehicle', vehicle);
                socket.broadcast.emit('update-vehicle', vehicle);
            });

            socket.on('vehicle-add', vehicle => {
                console.log('Server: Detected Vehicle Addition');
                vehicle_data[vehicle.id] = vehicle;     //Update data on the server for syncing with clients connected later (demo app) :: Update data on the database (real app)
                socket.emit('add-vehicle', vehicle);
                socket.broadcast.emit('add-vehicle', vehicle);
            });

            socket.on('vehicle-remove', vehicle => {
                console.log('Server: Detected Vehicle Removal');
                delete vehicle_data[vehicle.id];    //Update data on the server for syncing with clients connected later (demo app) :: Update data on the database (real app)
                socket.emit('remove-vehicle', vehicle);
                socket.broadcast.emit('remove-vehicle', vehicle);
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