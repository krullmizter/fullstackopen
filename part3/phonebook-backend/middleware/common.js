const cors = require("cors");
const express = require("express");

const commonMiddleware = (app) => {
  app.use(cors());
  app.use(express.json());
};

module.exports = commonMiddleware;
