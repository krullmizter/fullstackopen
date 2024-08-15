const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
const User = require("../models/usersModel");

const getAllBlogs = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const filter = userId ? { user: userId } : {};

    const blogs = await Blog.find(filter).populate("user", {
      username: 1,
      name: 1,
    });

    if (blogs.length === 0) {
      console.error("Backend, no blogs found");
      return res.status(404).send({ error: "No blogs found" });
    }

    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

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

const updateBlog = async (req, res, next) => {
  const { likes } = req.body;
  const token = req.token;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }

    const updateData = {};

    if (likes !== undefined) {
      if (typeof likes !== "number") {
        return res.status(400).json({ error: "Likes must be a number" });
      }
      updateData.likes = likes;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true, context: "query" }
    ).populate("user", {
      username: 1,
      name: 1,
    });

    if (!updatedBlog) {
      return res.status(404).send({ error: "The blog was not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  const { comment } = req.body;
  const token = req.token; 

  try {
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Token invalid" });
    }

    if (!comment || typeof comment !== "string" || !comment.trim()) {
      return res
        .status(400)
        .json({ error: "Comment must be a non-empty string" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();

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
  getBlog,
  createBlog,
  deleteBlog,
  updateBlog,
  deleteAllBlogs,
  addComment,
};
