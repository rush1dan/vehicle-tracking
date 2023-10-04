require('dotenv').config();

const vehicle_data = {
    "ঢাকা মেট্রো - গ - ১২৩৪": {
        "number_plate": "ঢাকা মেট্রো - গ - ১২৩৪",
        "lat": 23.8103,
        "lon": 90.4125,
        "status": "idle",
        "category": "car",
        "model": "Toyota Corolla"
    },
    "ঢাকা মেট্রো - ক - ৫৬৭৮": {
        "number_plate": "ঢাকা মেট্রো - ক - ৫৬৭৮",
        "lat": 23.7925,
        "lon": 90.4078,
        "status": "moving",
        "category": "bus",
        "model": "Volvo XC90"
    },
    "ঢাকা মেট্রো - ঘ - ৯০১২": {
        "number_plate": "ঢাকা মেট্রো - ঘ - ৯০১২",
        "lat": 23.7639,
        "lon": 90.4133,
        "status": "idle",
        "category": "truck",
        "model": "Ford F-150"
    },
    "ঢাকা মেট্রো - খ - ৩৪৫৬": {
        "number_plate": "ঢাকা মেট্রো - খ - ৩৪৫৬",
        "lat": 23.7540,
        "lon": 90.3660,
        "status": "moving",
        "category": "car",
        "model": "Honda Civic"
    },
    "ঢাকা মেট্রো - চ - ৭৮৯০": {
        "number_plate": "ঢাকা মেট্রো - চ - ৭৮৯০",
        "lat": 23.7465,
        "lon": 90.3760,
        "status": "idle",
        "category": "bus",
        "model": "Mercedes-Benz Sprinter"
    },
    "ঢাকা মেট্রো - গ - ২৯৪৫": {
        "number_plate": "ঢাকা মেট্রো - গ - ২৯৪৫",
        "lat": 23.7375,
        "lon": 90.4133,
        "status": "moving",
        "category": "truck",
        "model": "Chevrolet Silverado"
    },
    "ঢাকা মেট্রো - ঙ - ৫৪৩২": {
        "number_plate": "ঢাকা মেট্রো - ঙ - ৫৪৩২",
        "lat": 23.7558,
        "lon": 90.3577,
        "status": "idle",
        "category": "car",
        "model": "Nissan Altima"
    },
    "ঢাকা মেট্রো - ক - ৬৫৪৩": {
        "number_plate": "ঢাকা মেট্রো - ক - ৬৫৪৩",
        "lat": 23.7895,
        "lon": 90.4028,
        "status": "moving",
        "category": "bus",
        "model": "Ford Transit"
    },
    "ঢাকা মেট্রো - গ - ৭৬৫৪": {
        "number_plate": "ঢাকা মেট্রো - গ - ৭৬৫৪",
        "lat": 23.7712,
        "lon": 90.4115,
        "status": "idle",
        "category": "truck",
        "model": "Chevrolet Colorado"
    },
    "ঢাকা মেট্রো - চ - ৮৭৬৫": {
        "number_plate": "ঢাকা মেট্রো - চ - ৮৭৬৫",
        "lat": 23.7974,
        "lon": 90.3549,
        "status": "moving",
        "category": "car",
        "model": "Hyundai Sonata"
    }
};

const { addVehicles, connectToMongoDB, disconnectFromMongoDB } = require("./lib/mongodb");

const userId = "651ac6b7bca606f050794f34";
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