const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/usersModel");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({ token, username: user.username, name: user.name });
};

module.exports = { loginUser };
