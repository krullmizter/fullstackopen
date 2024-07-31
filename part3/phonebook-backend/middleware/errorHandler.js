// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ error: "Malformatted ID" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
