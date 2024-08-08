// All middleware logic is defined, and stored in this file

// Handles unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown API endpoint" });
};

// Error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.message, { stack: err.stack });

  if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Malformed JSON" });
  } else if (err.name === "CastError") {
    return res.status(400).send({ error: "Malformed ID" });
  } else if (err.code === 11000) {
    return res.status(409).json({ error: "Duplicate key error" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else {
    const errorResponse =
      process.env.NODE_ENV === "prod" // Won't show stack trace in prod
        ? { error: "Internal Server Error" }
        : { error: err.message, stack: err.stack };

    res.status(500).json(errorResponse);
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
