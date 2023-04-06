const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        phone: String,
        line1: {
            type: String,
            required: true,
        },
        line2: {
            type: String,
            required: true,
        },
        instructions: String,
        isDefault: Boolean,
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = { Address, addressSchema };
