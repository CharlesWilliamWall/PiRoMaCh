const Promo = require("../database/models/promo.model");

function deleteAllPromos() {
    return Promo.deleteMany();
} // Supprime toutes les promos de la collection pour permettre d'en créer de nouvelles ensuite

function savePromo(objectID, dateStart, dateEnd) {
    const discount = Math.round((Math.random() * (80 - 10) + 10) / 5) * 5; // rabais entre 10 et 80 par tranche de 5

    const newPromo = new Promo({
        objectID,
        discount,
        dateStart,
        dateEnd,
    });

    return newPromo.save();
} // Save une promo dans la collection

function getCurrentPromos() {
    const now = new Date();

    return Promo.find().lte("dateStart", now).gt("dateEnd", now).select("-_id -__v");
} // Retourne toutes les promos actives

async function getCurrentPromosIds() {
    const now = new Date();

    const promosObj = await Promo.find().lte("dateStart", now).gt("dateEnd", now).select("objectID -_id");

    return promosObj.map((p) => p.objectID);
} // Retourne les objectID de toutes les promos actives

module.exports = { deleteAllPromos, savePromo, getCurrentPromos, getCurrentPromosIds };
