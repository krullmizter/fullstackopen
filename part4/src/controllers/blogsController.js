const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
const User = require("../models/usersModel");

// Get all blogs
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });

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
    const token = req.token;

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const { title, author, url, likes } = req.body;

    if (!title || !author || !url) {
      return res
        .status(400)
        .json({ error: "Title, author, and url are required" });
    }

    const newBlog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await newBlog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
};

// Delete a blog, by its ID
const deleteBlog = async (req, res, next) => {
  try {
    const token = req.token;

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return res
        .status(403)
        .json({ error: "Only the creator can delete this blog" });
    }

    const result = await Blog.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(400).json({ error: "Blog could not be deleted" });
    }
  } catch (error) {
    next(error);
  }
};

// Update a blog, by its ID
const updateBlog = async (req, res, next) => {
  const { likes } = req.body;

  try {
    if (likes !== undefined && typeof likes !== "number") {
      return res.status(400).json({ error: "Likes must be a number" });
    }

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

const deleteAllBlogs = async (req, res, next) => {
  try {
    console.log("Deleting all blogs...");
    await Blog.deleteMany({});
    console.log("All blogs deleted");
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting blogs:", error);
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  deleteAllBlogs,
};
