const Item = require("../database/models/item.model");

function getItem(objectID) {
    return Item.findOne().where("objectID", objectID);
}

function getInvoiceItem(objectID, fields) {
    return Item.findOne().where("objectID", objectID).select(`${fields}`).lean();
}

module.exports = { getItem, getInvoiceItem };
