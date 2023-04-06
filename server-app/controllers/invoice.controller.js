const { saveInvoice, getInvoices } = require("../queries/invoice.queries");
const { getInvoiceItem } = require("../queries/item.queries");
const { taxes } = require("../data/config.json");
const { getCurrentPromos } = require("../queries/promos.queries");
const { findUserByID, getUserInfo } = require("../queries/users.queries");

var nextId = 0;

exports.createInvoice = async (req, res, next) => {
    try {
        var orderInfo = req.body;

        let invoiceInfo = {
            id: 0,
            items: [],
            user: {},
        }; //object to save and return invoice to client

        //add id
        //TODO record invoice ID so it doesn't restart with refresh
        invoiceInfo.id = nextId + 1;
        nextId = invoiceInfo.id;

        // add date
        invoiceInfo.date = orderInfo.date; // format for date ?

        //add items
        const tempItems = [];

        //**NOTE: everything is done twice maybe here? */
        orderInfo.items.forEach((item) => {
            tempItems.push(getItemInvoiceInfo(item.objectID));
        });

        //wait until all promises in tempItems are resolved (36)
        // to join items coming from client and data we get from db (37-39)
        await Promise.all(tempItems).then((shortItems) => {
            for (let i = 0; i < orderInfo.items.length; i++) {
                invoiceInfo.items.push({ ...shortItems[i], ...orderInfo.items[i] });
            }
        });

        //check and apply promos
        await checkPromos(invoiceInfo.items);

        // add items subtotal
        calcItemsSubTotal(invoiceInfo.items);

        // add invoice money calc
        //TODO check if  we get the same amount of money if yes all good
        //if not throw warning to say something happened during transfer
        invoiceInfo = { ...invoiceInfo, ...calcMoney(invoiceInfo.items, taxes) };

        const user = await getUserInfo(orderInfo.usrID, "email");

        if (user) {
            invoiceInfo.user = { email: user.email };
        }
        res.send(invoiceInfo);
    } catch (error) {
        next(error);
    }
};

function calcItemsSubTotal(items) {
    // await checkPromos(items);
    items.forEach((item) => {
        //check promos before adding item subtotal
        item.subtotal = item.price * item.quantity;
    });
}
async function checkPromos(items) {
    try {
        const promos = await getCurrentPromos(); // get 100 items in promo
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < promos.length; j++) {
                if (items[i].objectID == promos[j].objectID) {
                    items[i].price = items[i].price - (items[i].price * promos[j].discount) / 100;
                }
            }
        }
    } catch (error) {
        next(error);
    }
}

function calcMoney(items, taxes) {
    const money = {
        subtotal: 0,
    };

    items.forEach((item) => {
        money.subtotal += item.subtotal;
    });

    money.subtotal < 200 && money.subtotal !== 0 ? (money.delivery = 15) : (money.delivery = 0);
    money.gst = (money.subtotal + money.delivery) * taxes.gst;
    money.pst = (money.subtotal + money.delivery) * taxes.pst;
    money.total = money.subtotal + money.gst + money.pst;

    return money;
}
async function getItemInvoiceInfo(objectID) {
    try {
        const item = await getInvoiceItem(objectID, "title price artistDisplayName");
        const tempItem = { title: item.title, price: item.price, artistDisplayName: item.artistDisplayName };
        return tempItem;
        // res.status(200).json({
        //     status: 200,
        //     item,
        //     message: "success",
        // });
    } catch (error) {
        next(error);
    }
}

exports.saveInvoice = async (req, res, next) => {
    try {
        const invoiceInfo = req.body;
        const response = await saveInvoice(invoiceInfo);
    } catch (error) {
        next(error);
    }
};

exports.getInvoicesDataByEmail = async (req, res, next) => {
    try {
        const email = req.params.email;
        const invoices = await getInvoices(email);
        res.status(200).json({
            status: 200,
            invoices,
            message: "success",
        });
    } catch (error) {
        next(error);
    }
};
