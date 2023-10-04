const mongoose = require("mongoose");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
    }
}

const disconnectFromMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error disconnecting from MongoDB: ", error);
    }
}

const getVehicles = async (userId) => {
    try {
        const vehicles = await Vehicle.find({ user: userId });
        return vehicles;
    } catch (error) {
        console.error("Error retrieving vehicle list from MongoDB: ", error);
    }
}

//for pre-populating data
const addVehicles = async (userId, vehicles) => {
    const vehicles_list = Object.values(vehicles);
    vehicles_list.forEach(async (vehicle) => {
        await addVehicle(userId, vehicle);
    });
}

const addVehicle = async (userId, vehicle) => {
    try {
        const newVehicle = await Vehicle.create({ ...vehicle });
        const user = await User.findById(userId);
        user.vehicles.push(newVehicle);
        await user.save();
        newVehicle.user = user;
        await newVehicle.save();
    } catch (error) {
        console.error("Error adding vehicle to MongoDB: ", error);
    }
}

module.exports = {connectToMongoDB, disconnectFromMongoDB, addVehicles, addVehicle}