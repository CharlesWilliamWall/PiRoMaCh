const router = require("express").Router();
const { getItemData } = require("../controllers/item.controller");

router.get("/:objectID", getItemData);

module.exports = router;