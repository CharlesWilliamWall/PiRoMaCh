const router = require("express").Router();
const itemsRouter = require("./items.routes");
const promosRouter = require("./promos.routes");
const itemRouter = require("./item.routes");
const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");
const validateRouter = require("./validate.routes");
const CheckoutRouter = require("./checkout.routes");
const invoiceRouter = require("./invoice.routes");

// Home
router.get("/", (req, res) => {
    res.redirect("/home");
});

router.get("/home", (req, res) => {
    res.status(200).json({
        status: 200,
        count: null,
        items: null,
        message: "success, mais il n'y a rien à voir ici...",
    });
});

// Produits
router.use("/items", itemsRouter);

//Produit
router.use("/item", itemRouter);

//Promotions
router.use("/promotions", promosRouter);

//Checkout
router.use("/checkout", CheckoutRouter);

//Users
router.use("/api/users", usersRouter);
router.use("/api/auth", authRouter);

router.use("/validate", validateRouter);
router.use("/invoice", invoiceRouter);

// Page d'erreur
// Il faudrait retravailler le gestionnaire d'erreur pour gérer TOUTES les erreurs et non juste celles en lien avec la page d'items
router.use("/error", (req, res) => {
    res.status(400).json({
        status: 400,
        count: null,
        items: null,
        message: "erreur, vérifiez la console serveur pour le message d'erreur",
    });
});

// Toutes autres routes
// Il faudrait voir si retourner items: null devrait être autre chose ou pourrait être exclu complètement
router.all("*", (req, res) => {
    res.status(404).json({
        status: 404,
        items: null,
        message: "Route invalide",
    });
});

module.exports = router;
