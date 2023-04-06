const router = require("express").Router();
const { getItemsData } = require("../controllers/items.controller");
const { buildItemsQuery } = require("../utils/queryBuilder");

router.get("/", buildItemsQuery, getItemsData);

module.exports = router;
