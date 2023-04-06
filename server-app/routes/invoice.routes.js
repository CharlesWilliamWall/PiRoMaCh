const router = require("express").Router();
const { createInvoice, saveInvoice, getInvoicesDataByEmail } = require("../controllers/invoice.controller");

router.post("/", createInvoice);
router.post("/save", saveInvoice);
router.get("/get/:email", getInvoicesDataByEmail);

module.exports = router;
