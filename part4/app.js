require("dotenv").config();
const express = require("express");
const cors = require("cors");
const blogRouter = require("./src/routes/blog");
const middleware = require("./src/utils/middleware");

const app = express();

// Routes
app.use("/api/blogs", blogRouter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
