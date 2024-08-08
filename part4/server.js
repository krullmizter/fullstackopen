// Main entry file (often index.js but I like server.js more)

require("dotenv").config(); // Init dotenv to load environment variables

const config = require("./src/utils/config"); // Handles configs, using .env file
const mongoose = require("mongoose");
const app = require("./app");

// Initialize backend/app
const server = app.listen(config.port, () => {
  const backendUrl =
    config.env === "production"
      ? "https://prod.com"
      : `http://localhost:${config.port}`;

  console.log(
    `\nBackend env: ${config.env}\nBackend running on: ${backendUrl}`,
  );
});

// DB connection
mongoose
  .connect(config.mongoUrl, {})
  .then(() => {
    console.log("Successfully connected to DB\n");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  });

// Graceful shutdowns
const shutdown = () => {
  console.log("Shutdown received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server was shutdown");
    mongoose.connection.close(false, () => {
      console.log("DB connection was closed");
      process.exit(0);
    });
  });

  // If shutdown takes too long, force it
  setTimeout(() => {
    console.error("Graceful shutdown of services took too long, forcing exit");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Track unhandled rejections
process.on("unhandledRejection", (res, prom) => {
  console.error("Unhandled rejection:", prom, "due to:", res);
  shutdown();
});

// Track uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  shutdown();
});
