require("dotenv").config();

const environment = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3001;

const mongoUrls = {
  development: process.env.MONGODB_DEVELOPMENT,
  production: process.env.MONGODB_PRODUCTION,
  test: process.env.MONGODB_TEST,
};

const url = mongoUrls[environment] || mongoUrls.development;

const config = {
  env: environment,
  port,
  mongoUrl: url,
};

Object.freeze(config);

module.exports = config;
