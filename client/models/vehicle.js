import mongoose from "mongoose";
import { Schema, models } from "mongoose";

const vehicleSchema = new Schema({
    number_plate: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    lon: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    },
    status: {
        type: String,
        required: true,
        enum: ['idle', 'moving']
    },
    category: {
        type: String,
        enum: ['car', 'bus', 'truck']
    },
    model: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const Vehicle = models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;