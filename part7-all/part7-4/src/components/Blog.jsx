import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { getToken } from "../utils/localStorage";
import { updateBlog, deleteBlog } from "../services/blogService";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, onBlogUpdated }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const handleToggleDetails = useCallback(() => {
    setShowDetails((prev) => !prev);
  }, []);

  const handleLike = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      setIsLoading(true);
      const updatedBlog = await updateBlog(
        blog.id,
        { likes: blog.likes + 1 },
        token
      );
      dispatch(likeBlog(updatedBlog));
      onBlogUpdated();
      dispatch(
        setNotification({
          message: `You liked: ${updatedBlog.title}!`,
          type: "success",
        })
      );
    } catch (error) {
      console.error("Failed to like blog", error);
    } finally {
      setIsLoading(false);
    }
  }, [blog, dispatch, onBlogUpdated]);

  const handleDelete = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      await deleteBlog(blog.id, token);
      dispatch(removeBlog(blog.id));
      onBlogUpdated();
      dispatch(
        setNotification({
          message: "Blog deleted successfully",
          type: "success",
        })
      );
    } catch (error) {
      console.error("Failed to delete blog", error);
    } finally {
      setIsLoading(false);
    }
  }, [blog.id, dispatch, onBlogUpdated]);

  const canDelete = useMemo(() => {
    return (
      currentUser &&
      blog.user &&
      typeof blog.user === "object" &&
      currentUser.id === blog.user.id
    );
  }, [currentUser, blog]);

  return (
    <div className="blog-item">
      <div className="blog-summary">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-author">by {blog.author}</p>
        <div className="blog-buttons-container">
          <button className="toggle-details" onClick={handleToggleDetails}>
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          <button
            className="like-button"
            onClick={handleLike}
            disabled={isLoading}
          >
            {isLoading ? "Liking..." : "Like"}
          </button>
          {canDelete && (
            <button
              className="delete-button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
      {showDetails && (
        <div className="blog-details">
          <p className="blog-url">
            URL:{" "}
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </p>
          <p className="blog-likes">Likes: {blog.likes}</p>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ]),
  }).isRequired,
  onBlogUpdated: PropTypes.func.isRequired,
};

export default Blog;
