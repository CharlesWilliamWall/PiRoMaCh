const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Un Id est requis"],
    },
    subtotal: {
        type: Number,
        required: [true, "Un soustotal est requis"],
    },
    delivery: {
        type: Number,
        required: [true, "Les frais d'envoi sont requis"],
    },
    gst: {
        type: Number,
        required: [true, "La taxe gst est requise"],
    },
    pst: {
        type: Number,
        required: [true, "La taxe pst est requise"],
    },
    total: {
        type: Number,
        required: [true, "Le total est requis"],
    },
    date: {
        type: Date,
        required: [true, "Une date est requise"],
    },
    items: [
        {
            objectID: {
                type: Number,
                required: [true, "Le id de l'item est requis"],
            },
            title: {
                type: String,
                required: [true, "Un titre est requis"],
            },
            price: {
                type: Number,
                required: [true, "Le prix est requis"],
            },
            artistDisplayName: {
                type: String,
            },
            quantity: {
                type: Number,
                required: [true, "Une quantité est requise"],
            },
            subtotal: {
                type: Number,
                required: [true, "le sous total est requis"],
            },
        },
    ],
    address: {
        fullName: {
            type: String,
            required: [true, "le nom complet est requis"],
        },
        email: {
            type: String,
            required: [true, "le courriel est requis"],
        },
        phone: {
            type: String,
        },
        line1: {
            type: String,
            required: [true, "l'adresse est requise"],
        },
        line2: {
            type: String,
            required: [true, "l'adresse est requise"],
        },
        instructions: {
            type: String,
        },
    },
    payment: {
        cardName: {
            type: String,
            required: [true, "Le nom de la carte est requis"],
        },
        cardNumber: {
            type: String,
            required: [true, "Le numéro de la carte est requis"],
        },
        cardExpiration: {
            type: String,
            required: [true, "La date d'expiration est requise"],
        },
        cardVerificationNumber: {
            type: String,
            required: [true, "Le numéro de vérification est requis"],
        },
    },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
