// Config file to store and manage environment variables, etc.

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3001,
  mongoUrl: process.env.MONGODB_URL,
};

module.exports = config;
