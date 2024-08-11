const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

// Handles unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown API endpoint" });
};

// Error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.message, { stack: err.stack });

  if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Malformed JSON" });
  } else if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformed ID" });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    res.status(400).send({ error: "Expected `username` to be unique" });
  } else if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key error" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else {
    const errorResponse =
      process.env.NODE_ENV === "production" 
        ? { error: "Internal Server Error" }
        : { error: err.message, stack: err.stack };

    res.status(500).json(errorResponse);
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (decodedToken.id) {
        req.user = await User.findById(decodedToken.id);
      }
    } catch (error) {
      return res.status(401).json({ error: "Token invalid or expired" });
    }
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
