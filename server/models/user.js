const mongoose = require("mongoose");
const { Schema, models } = require("mongoose");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        vehicles: {
            type: [mongoose.SchemaTypes.ObjectId],
            ref: 'Vehicle'
        }
    },
    {
        timestamps: true
    }
);

const User = models.User || mongoose.model('User', userSchema);

module.exports = User;