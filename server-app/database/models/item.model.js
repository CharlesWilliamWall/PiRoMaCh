const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        objectID: {
            type: Number,
            required: [true, "Un Id est requis"],
            unique: true,
        },
        primaryImage: {
            type: String,
            required: [true, "Un url d'image est requis"],
        },
        primaryImageSmall: {
            type: String,
            required: [true, "Un url d'image format réduit est requis"],
        },
        additionalImages: {
            type: Array,
        },
        department: {
            type: String,
            required: [true, "Un département est requis"],
        },
        objectName: {
            type: String,
            required: [true, "Un nom d'objet est requis"],
        },
        title: {
            type: String,
            required: [true, "Un titre d'objet est requis"],
        },
        culture: {
            type: String,
        },
        period: {
            type: String,
        },
        artistDisplayName: {
            type: String,
            required: [true, "Un nom d'artiste est requis"],
        },
        artistDisplayBio: {
            type: String,
        },
        objectDate: {
            type: String,
        },
        objectEndDate: {
            type: Number,
            required: [true, "Une date est requise pour l'objet"],
        },
        medium: {
            type: String,
        },
        dimensions: {
            type: String,
        },
        classification: {
            type: String,
            required: [true, "Une classification est requise"],
        },
        objectURL: {
            type: String,
        },
        rating: {
            type: Number,
            required: [true, "Une évaluation est requise"],
            min: [1, "L'évaluation doit être entre 1 et 5 inclusivement"],
            max: [5, "L'évaluation doit être entre 1 et 5 inclusivement"],
        },
        price: {
            type: Number,
            required: [true, "Un prix est requis"],
            min: [0, "Le prix ne peut pas être négatif"],
        },
        tags: {
            type: Array,
            required: [true, "Au moins un tag est requis"],
        },
    }
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true },
    // }
);

itemSchema.statics.search = function (searchTerm, validFields) {
    const query = {
        $or: [
            ...validFields.map((field) => ({
                [field]: new RegExp(searchTerm, "i"),
            })),
        ],
    };
    return this.find(query);
}; // https://nesin.io/blog/search-multiple-fields-in-mongoose-model

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
