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

// Delete a blog, by its ID
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).send({ error: "The blog was not found" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// Update a blog, by its ID
const updateBlog = async (req, res, next) => {
  const { likes } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { likes },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedBlog) {
      return res.status(404).send({ error: "The blog was not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
};
