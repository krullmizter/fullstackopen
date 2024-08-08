// This handles all API endpoints and moving requests to controllers to handle
const express = require("express");
const {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

module.exports = router;
