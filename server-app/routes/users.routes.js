const router = require("express").Router();
const {
    signup,
    fetchCurrentUser,
    addAddress,
    deleteAddress,
    addCard,
    deleteCard,
} = require("../controllers/users.controller");

router.post("/", signup);
router.get("/", fetchCurrentUser);

router.post("/addCard", addCard);
router.post("/deleteCard", deleteCard);

router.post("/addAddress", addAddress);
router.post("/deleteAddress", deleteAddress);

module.exports = router;
