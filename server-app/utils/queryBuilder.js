// Valeurs valides pour certains champs du req.query
const validDepartments = require("../data/departments.json").map((d) => d.displayName); // garde noms départements dans array
const validLimits = [12, 24, 36]; // Nb d'items par page valides
const validSorts = ["price", "-price", "rating", "-rating"];
const validRatings = [1, 2, 3, 4]; // Rating valides pour les filtres

// Construit le query pour obtenir les données voulues de la DB
async function buildItemsQuery(req, res, next) {
    try {
        let page = req.query.page ? Number(req.query.page) : 1; // page demandée (1 par défaut)
        const limit = validLimits.includes(Number(req.query.limit)) ? Number(req.query.limit) : 12; // nb d'items demandés (12 par défaut)
        let skip = (page - 1) * limit; // nb d'items à sauter, calculé avec page et nb d'items
        if (skip < 0) skip = 0; // encore requis?
        const sort = validSorts.includes(req.query.sort) ? `${req.query.sort} objectID` : "-rating objectID"; // ordre de tri demandé (rating décroissant par défaut)
        const minPrice = req.query.minPrice > 0 && req.query.minPrice < 10000 ? Number(req.query.minPrice) : 0;
        const maxPrice = req.query.maxPrice >= 100 && req.query.maxPrice <= 10000 ? Number(req.query.maxPrice) : 10000;
        const rating = validRatings.includes(Number(req.query.rating)) ? req.query.rating : 1;
        const dep = validDepartments.includes(req.query.dep) ? [req.query.dep] : validDepartments; // accepte 1 dept à la fois pour le moment sinon default = tous dept

        const minDate = req.query.minDate >= -550 && req.query.minDate < 2023 ? Number(req.query.minDate) : -550;
        const maxDate = req.query.maxDate > -550 && req.query.maxDate <= 2023 ? Number(req.query.maxDate) : 2023;

        const search = req.query.search ? req.query.search.trim() : null;

        const promosOnly = req.query.promosOnly === "true" ? true : false;

        // Ajoute détails du query sur la requête
        req.itemsQuery = {
            page,
            limit,
            skip,
            sort,
            minPrice,
            maxPrice,
            rating,
            dep,
            minDate,
            maxDate,
            search,
            promosOnly,
        };

        next();
    } catch (error) {
        next(error);
    }
}

//build Promos query
module.exports = { buildItemsQuery };
