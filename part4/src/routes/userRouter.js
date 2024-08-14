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
router.post("/reset", deleteAllUsers);
router.get("/:id", getUserById);

module.exports = router;
