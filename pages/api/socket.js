import { Server } from 'socket.io'

//Initial demo data:
//Should be obtained from a database in a real-world application
const vehicle_data = {
    "ঢাকা মেট্রো - গ - ১২৩৪": {
        "id": "ঢাকা মেট্রো - গ - ১২৩৪",
        "lat": 23.8103,
        "lon": 90.4125,
        "status": "idle",
        "category": "car",
        "driver": "John Doe",
        "model": "Toyota Corolla"
    },
    "ঢাকা মেট্রো - ক - ৫৬৭৮": {
        "id": "ঢাকা মেট্রো - ক - ৫৬৭৮",
        "lat": 23.7925,
        "lon": 90.4078,
        "status": "moving",
        "category": "bus",
        "driver": "Alice Smith",
        "model": "Volvo XC90"
    },
    "ঢাকা মেট্রো - ঘ - ৯০১২": {
        "id": "ঢাকা মেট্রো - ঘ - ৯০১২",
        "lat": 23.7639,
        "lon": 90.4133,
        "status": "idle",
        "category": "truck",
        "driver": "Bob Johnson",
        "model": "Ford F-150"
    },
    "ঢাকা মেট্রো - খ - ৩৪৫৬": {
        "id": "ঢাকা মেট্রো - খ - ৩৪৫৬",
        "lat": 23.7540,
        "lon": 90.3660,
        "status": "moving",
        "category": "car",
        "driver": "Eva Brown",
        "model": "Honda Civic"
    },
    "ঢাকা মেট্রো - চ - ৭৮৯০": {
        "id": "ঢাকা মেট্রো - চ - ৭৮৯০",
        "lat": 23.7465,
        "lon": 90.3760,
        "status": "idle",
        "category": "bus",
        "driver": "David Wilson",
        "model": "Mercedes-Benz Sprinter"
    },
    "ঢাকা মেট্রো - গ - ২৯৪৫": {
        "id": "ঢাকা মেট্রো - গ - ২৯৪৫",
        "lat": 23.7375,
        "lon": 90.4133,
        "status": "moving",
        "category": "truck",
        "driver": "Grace Lee",
        "model": "Chevrolet Silverado"
    },
    "ঢাকা মেট্রো - ঙ - ৫৪৩২": {
        "id": "ঢাকা মেট্রো - ঙ - ৫৪৩২",
        "lat": 23.7558,
        "lon": 90.3577,
        "status": "idle",
        "category": "car",
        "driver": "Frank White",
        "model": "Nissan Altima"
    },
    "ঢাকা মেট্রো - ক - ৬৫৪৩": {
        "id": "ঢাকা মেট্রো - ক - ৬৫৪৩",
        "lat": 23.7895,
        "lon": 90.4028,
        "status": "moving",
        "category": "bus",
        "driver": "Hannah Davis",
        "model": "Ford Transit"
    },
    "ঢাকা মেট্রো - গ - ৭৬৫৪": {
        "id": "ঢাকা মেট্রো - গ - ৭৬৫৪",
        "lat": 23.7712,
        "lon": 90.4115,
        "status": "idle",
        "category": "truck",
        "driver": "James Smith",
        "model": "Chevrolet Colorado"
    },
    "ঢাকা মেট্রো - চ - ৮৭৬৫": {
        "id": "ঢাকা মেট্রো - চ - ৮৭৬৫",
        "lat": 23.7974,
        "lon": 90.3549,
        "status": "moving",
        "category": "car",
        "driver": "Olivia Taylor",
        "model": "Hyundai Sonata"
    }
};

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            cors: {
                origin: "*"
            }
        })
        io.listen(process.env.BACKEND_PORT);
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log('Server: Connection Established');

            socket.on('request-data', () => {
                console.log('Server: Received Initial Data Request');
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
    res.end()
}

export default SocketHandler