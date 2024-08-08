// This file handles the blogs "business" logic
const Blog = require("../models/blog");

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    if (blogs.length === 0) {
      console.error("No blogs were found");
      return res.status(404).send({ error: "No blogs were found" });
    }

    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// Create a blog
const createBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body;

    const newBlog = new Blog({ title, author, url, likes: likes || 0 });
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
};
