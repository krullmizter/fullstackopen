// All middleware logic is defined, and stored in this file

// Handles unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown API endpoint" });
};

// General error handler for Express
const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformed id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
