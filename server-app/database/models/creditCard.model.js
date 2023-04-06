const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema(
    {
        cardName: {
            type: String,
            required: true,
        },
        cardNumber: {
            type: String,
            required: true,
        },
        cardExpiration: {
            type: String,
            required: true,
        },
        cardVerificationNumber: {
            type: String,
            required: true,
        },
        isDefault: Boolean,
    },
    {
        timestamps: true,
    }
);


const CreditCard = mongoose.model("CreditCard", creditCardSchema);

module.exports = {CreditCard, creditCardSchema };
