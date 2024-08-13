const express = require("express");
const {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  deleteAllBlogs,
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);
router.post("/reset", deleteAllBlogs);

module.exports = router;
