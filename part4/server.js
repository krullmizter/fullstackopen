require("dotenv").config();
const config = require("./src/utils/config");
const mongoose = require("mongoose");
const app = require("./app");

// DB connection
mongoose
  .connect(config.mongoUrl, {})
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  });

// Initialize app
const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}\nIn ${config.env} mode`);
});

// Graceful shutdowns
process.on("SIGTERM", () => {
  console.log("SIGTERM received: closing HTTP server");
  server.close(() => {
    console.log("Server shutdown");
    mongoose.connection.close(false, () => {
      console.log("DB connection closed");
      process.exit(0);
    });
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received: closing HTTP server");
  server.close(() => {
    logger.info("Server shutdown");
    mongoose.connection.close(false, () => {
      logger.info("DB connection closed");
      process.exit(0);
    });
  });
});
