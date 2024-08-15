const express = require("express");
const {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  deleteAllBlogs,
  addComment,
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);
router.post("/reset", deleteAllBlogs);
router.post("/:id", addComment);

module.exports = router;
