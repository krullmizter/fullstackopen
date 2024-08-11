require("dotenv").config();
const config = require("./src/utils/config");
const mongoose = require("mongoose");
const app = require("./app");

// Initialize backend/app
const server = app.listen(config.port, () => {
  const backendUrl =
    config.env === "production"
      ? "https://prod.com"
      : `http://localhost:${config.port}`;

  console.log(
    `\nBackend env: ${config.env}\nBackend running on: ${backendUrl}`
  );
});

// DB connection
mongoose
  .connect(config.mongoUrl, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Successfully connected to DB\n");
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error.message);
    process.exit(1);
  });

mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 20000);

// Graceful shutdowns
const shutdown = async () => {
  console.log("Shutdown received: closing HTTP server");

  const shutdownTimer = setTimeout(() => {
    console.error("Graceful shutdown took too long, forcing exit");
    process.exit(1);
  }, 10000);

  try {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          console.error("Error shutting down the server:", err);
          return reject(err);
        }
        console.log("HTTP server was shutdown");
        resolve();
      });
    });

    await mongoose.connection.close();
    console.log("DB connection was closed");

    clearTimeout(shutdownTimer);
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Track unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason, "in promise:", promise);
  shutdown();
});

// Track uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  shutdown();
});
