const router = require("express").Router();
const { createPromos, getPromosData } = require("../controllers/promos.controller");

router.get("/create", createPromos, getPromosData); // Créer promos et retourner promos actives (1ère utilisation)

router.get("/get", getPromosData); // retourner promos actives sans créer (utiliser au refresh fin promos précédentes)
router.get("/", (req, res) => {
    res.redirect("/promotions/get");
});

module.exports = router;
