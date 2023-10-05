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
        const user = await User.findById(userId);
        const vehicles = await Vehicle.find({ user: user });
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
        return newVehicle;
    } catch (error) {
        console.error("Error adding vehicle to MongoDB: ", error);
    }
}

const updateVehicle = async (vehicle) => {
    try {
        const vehicleToUpdate = await Vehicle.findById(vehicle._id);
        for (const key in vehicle) {
            if (key !== '_id') {    //copy all data except the _id without creating new object or assigment
                vehicleToUpdate[key] = vehicle[key];
            }
        }
        await vehicleToUpdate.save();
        return vehicleToUpdate;
    } catch (error) {
        console.error("Error updating vehicle at MongoDB: ", error);
    }
}

const removeVehicle = async (vehicle) => {
    try {
        const user = await User.findById(vehicle.user);
        user.vehicles.pull(vehicle._id);
        await user.save();
        await Vehicle.findByIdAndDelete(vehicle._id);
    } catch (error) {
        console.error("Error removing vehicle from MongoDB: ", error);
    }
}

module.exports = { connectToMongoDB, disconnectFromMongoDB, getVehicles, addVehicles, addVehicle, updateVehicle, removeVehicle }