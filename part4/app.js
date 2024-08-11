// Core
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Custom
const middleware = require("./src/utils/middleware");
const logger = require("./src/utils/logger");
const blogRouter = require("./src/routes/blogRouter");
const userRouter = require("./src/routes/userRouter");
const loginRouter = require("./src/routes/loginRouter");

const app = express();

// Use core middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Requests
app.use(express.json()); // JSON body parser
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100, // Each IP can make 100 requests in 10 minutes
    message: {
      error: "Too many requests (Please don't DDoS), try again later.",
    },
  })
);
logger(app); // Apply morgan logger middleware

// Apply middleware before routes
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogRouter); // Ensure userExtractor is only for routes that need it

// Routes
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// Additional middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
