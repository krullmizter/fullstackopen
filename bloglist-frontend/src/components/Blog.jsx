import { useState, useCallback, useMemo } from "react";
import { updateBlog, deleteBlog } from "../services/blogService";
import { getToken, getUser } from "../utils/localStorage";
import PropTypes from "prop-types";

const Blog = ({ blog, onBlogUpdated }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = getUser();

  const handleToggleDetails = useCallback(() => {
    setShowDetails((prev) => !prev);
  }, []);

  const handleLike = useCallback(async () => {
    const token = getToken();
    console.log("Handle like token:", token);
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      setIsLoading(true);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      await updateBlog(blog.id, updatedBlog, token);
      onBlogUpdated();
      console.log("Like button clicked");
    } catch (error) {
      console.error("Failed to like blog", error);
    } finally {
      setIsLoading(false);
    }
  }, [blog, onBlogUpdated]);

  const handleDelete = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    if (!currentUser) {
      console.error("Current user is not available");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      setIsLoading(true);
      await deleteBlog(blog.id, token);
      onBlogUpdated();
    } catch (error) {
      console.error("Failed to delete blog", error);
    } finally {
      setIsLoading(false);
    }
  }, [blog.id, currentUser, onBlogUpdated]);

  const blogStyle = useMemo(
    () => ({
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5,
    }),
    []
  );

  return (
    <div style={blogStyle} className="blog-component">
      <div className="blog-summary">
        <span className="blog-title">{blog.title}</span> by{" "}
        <span className="blog-author">{blog.author}</span>
        <button className="toggle-details" onClick={handleToggleDetails}>
          {showDetails ? "Hide" : "View"}
        </button>
        <button
          className="like-button"
          onClick={handleLike}
          disabled={isLoading}
        >
          Like
        </button>
        {currentUser && blog.user.id === currentUser.id && (
          <button
            className="delete-button"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </button>
        )}
      </div>
      {showDetails && (
        <div className="blog-details">
          <div className="blog-url">
            URL:{" "}
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </div>
          <div className="blog-likes">Likes: {blog.likes}</div>
          <div className="blog-added-by">Added by: {blog.user.name}</div>
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
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBlogUpdated: PropTypes.func.isRequired,
};

export default Blog;
