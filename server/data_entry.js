require('dotenv').config();

const { addVehicles, connectToMongoDB, disconnectFromMongoDB, getVehicles } = require("./lib/mongodb");

const vehicle_data = require('./data');
const userId = "651f8b75666961f9e6d11e82";      //for DemoUser100
async function enter_data() {
    console.log("Data Entry Started");
    await connectToMongoDB();
    await addVehicles(userId, vehicle_data);
    //await disconnectFromMongoDB();
    console.log("Data Entry Finished");
}

const { getRandomInRange } = require('./lib/utils');
async function modify_data() {
    console.log("Data Entry Started");
    await connectToMongoDB();
    const vehicles = await getVehicles(userId);
    const latRange = [23.7, 23.9];
    const lonRange = [90.30, 90.45];
    vehicles.forEach(async (vehicle) => {
        vehicle.lat = getRandomInRange(latRange[0], latRange[1]);
        vehicle.lon = getRandomInRange(lonRange[0], lonRange[1]);
        await vehicle.save();
    });
}

const express = require('express');
const app = express();

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    modify_data();
});