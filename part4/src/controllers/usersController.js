const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    // Populate the blogs field with title, author, and url
    const users = await User.find({}).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
    });

    if (users.length === 0) {
      console.error("No users were found");
      return res.status(404).send({ error: "No users were found" });
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Add a new user
const addUser = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({
        error: "Username and password are required",
      });
    }

    if (username.length < 3) {
      return res.status(400).send({
        error: "Username must be at least 3 characters long",
      });
    }

    if (password.length < 3) {
      return res.status(400).send({
        error: "Password must be at least 3 characters long",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({
        error: "Username must be unique",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
