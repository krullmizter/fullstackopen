// This handles all API endpoints and moving requests to controllers to handle
const express = require("express");
const { getBlogs, createBlog } = require("../controllers/blogs");

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);

module.exports = router;
