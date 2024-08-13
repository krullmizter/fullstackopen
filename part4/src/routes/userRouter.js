const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUsers,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.post("/reset", deleteAllUsers);

module.exports = router;
