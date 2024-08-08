// This handles all API endpoints and moving requests to controllers to handle
const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blogs");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);

module.exports = router;
