const express = require("express");
const { addUser, getAllUsers } = require("../controllers/usersController");

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);

module.exports = router;
