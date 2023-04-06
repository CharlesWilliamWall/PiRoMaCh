const Invoice = require("../database/models/invoice.model.js");

// invoiceInfo = {}, inItems = [{item}], user = {}
function saveInvoice(invoiceInfo) {
    const newInvoice = new Invoice({
        id: invoiceInfo.id,
        subtotal: invoiceInfo.subtotal,
        delivery: invoiceInfo.delivery,
        gst: invoiceInfo.gst,
        pst: invoiceInfo.pst,
        total: invoiceInfo.total,
        date: invoiceInfo.date,
        items: invoiceInfo.items,
        address: invoiceInfo.address,
        payment: invoiceInfo.payment,
    });
    return newInvoice.save();
}

function getInvoices(email) {
    return Invoice.find().where({ "address.email": email });
}

module.exports = { saveInvoice, getInvoices };
