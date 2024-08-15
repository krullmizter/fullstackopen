const express = require("express");
const {
  addUser,
  getAllUsers,
  deleteAllUsers,
  getUserById,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/reset", deleteAllUsers);

module.exports = router;
