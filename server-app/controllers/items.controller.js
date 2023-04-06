const { getItems, countItems } = require("../queries/items.queries");

async function getItemsData(req, res, next) {
    try {
        const [items, count] = await Promise.all([getItems(req.itemsQuery), countItems(req.itemsQuery)]);

        res.status(200).json({
            status: 200,
            count,
            items,
            message: "success",
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getItemsData };
