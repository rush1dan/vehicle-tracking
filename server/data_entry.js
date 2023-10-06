require('dotenv').config();

const { addVehicles, connectToMongoDB, disconnectFromMongoDB } = require("./lib/mongodb");

const vehicle_data = require('./data');

const userId = "651f8b75666961f9e6d11e82";      //for DemoUser100
async function enter_data() {
    console.log("Data Entry Started");
    await connectToMongoDB();
    await addVehicles(userId, vehicle_data);
    //await disconnectFromMongoDB();
    console.log("Data Entry Finished");
}

const express = require('express');
const app = express();

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    enter_data();
});