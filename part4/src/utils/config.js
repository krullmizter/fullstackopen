// Config file to store and manage environment variables, etc.

require("dotenv").config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3001,
  mongoUrl:
    process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
      ? process.env.MONGODB_DEVELOPMENT
      : process.env.MONGODB_PRODUCTION,
};

module.exports = config;
