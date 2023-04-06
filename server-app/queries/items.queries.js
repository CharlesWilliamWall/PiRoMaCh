const Item = require("../database/models/item.model");
const { getCurrentPromosIds } = require("./promos.queries");

const validSearchFields = [
    "objectName",
    "title",
    "culture",
    "period",
    "artistDisplayName",
    "medium",
    "classification",
    "tags",
]; // Les champs dans lesquels on permet le search

async function getItems(query) {
    if (query.promosOnly) {
        const promosIds = await getCurrentPromosIds();

        if (query.search) {
            // w/ search
            return Item.search(query.search.trim(), validSearchFields)
                .where("department", { $in: query.dep })
                .where("objectID", { $in: promosIds })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .collation({ locale: "en" })
                .sort(query.sort)
                .limit(query.limit)
                .skip(query.skip);
        } else {
            // w/o search
            return Item.find()
                .where("department", { $in: query.dep })
                .where("objectID", { $in: promosIds })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .collation({ locale: "en" })
                .sort(query.sort)
                .limit(query.limit)
                .skip(query.skip);
        }
    } else {
        if (query.search) {
            // w/ search
            return Item.search(query.search.trim(), validSearchFields)
                .where("department", { $in: query.dep })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .collation({ locale: "en" })
                .sort(query.sort)
                .limit(query.limit)
                .skip(query.skip);
        } else {
            // w/o search
            return Item.find()
                .where("department", { $in: query.dep })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .collation({ locale: "en" })
                .sort(query.sort)
                .limit(query.limit)
                .skip(query.skip);
        }
    }
}

function getRandomItems(nbItems) {
    return Item.aggregate([{ $project: { objectID: 1, _id: 0 } }]).sample(nbItems);
} // retourne les id d'items aléatoires ($project: retourne les champs voulu seulement, .sample() retourne des documents au hasard)

async function countItems(query) {
    if (query.promosOnly) {
        const promosIds = await getCurrentPromosIds();

        if (query.search) {
            // w/ search
            return Item.search(query.search.trim(), validSearchFields)
                .where("department", { $in: query.dep })
                .where("objectID", { $in: promosIds })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .countDocuments();
        } else {
            // w/o search
            return Item.find()
                .where("department", { $in: query.dep })
                .where("objectID", { $in: promosIds })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .countDocuments();
        }
    } else {
        if (query.search) {
            // w/ search
            return Item.search(query.search.trim(), validSearchFields)
                .where("department", { $in: query.dep })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .countDocuments();
        } else {
            // w/o search
            return Item.find()
                .where("department", { $in: query.dep })
                .gte("rating", query.rating)
                .gte("price", query.minPrice)
                .lte("price", query.maxPrice)
                .gte("objectEndDate", query.minDate)
                .lte("objectEndDate", query.maxDate)
                .countDocuments();
        }
    }
}

module.exports = {
    getItems,
    countItems,
    getRandomItems,
};
