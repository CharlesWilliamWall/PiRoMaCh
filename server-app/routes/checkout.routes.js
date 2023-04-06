const router = require("express").Router();
const checkoutController = require("../controllers/checkout.controller");

// Checkout
router.get("/", checkoutController.getItemsData);

module.exports = router;
