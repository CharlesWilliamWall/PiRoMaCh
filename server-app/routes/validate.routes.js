const router = require("express").Router();
const { validateAddress, validateCard } = require("../controllers/validate.controller");

router.post("/address", validateAddress);
router.post("/creditCard", validateCard);

module.exports = router;
