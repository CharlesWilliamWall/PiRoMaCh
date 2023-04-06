const { getItem } = require("../queries/item.queries");

async function getItemData(req, res, next) {
    try {
        const item = await getItem(req.params.objectID);

        res.status(200).json({
            status: 200,
            item,
            message: "success",
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getItemData };
