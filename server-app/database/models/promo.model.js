const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
    objectID: {
        type: Number,
        required: [true, "Un Id est requis"],
        // unique: true, // ne peut pas être unique, car doit pouvoir réutiliser le même id pour des promos futures
    },
    discount: {
        type: Number,
        required: [true, "Un pourcentage de réduction est requis"],
        min: [0, "Le rabais ne peut pas être négatif"],
        max: [100, "Le rabais ne peut pas être plus grand que 100%"],
    },
    dateStart: {
        type: Date,
        required: [true, "Une date de début est requise"],
    },
    dateEnd: {
        type: Date,
        required: [true, "Une date de fin est requise"],
        // idéalement ajouter une validation que la date de fin est plus grande que la date de début
    },
});

const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
