import { useEffect, useState, useCallback, useMemo } from "react";
import { getBlogs } from "../services/blogService";
import { getUser } from "../utils/localStorage";
import NewBlogForm from "./NewBlogForm";
import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ setNotification }) => {
  const [blogs, setBlogs] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const blogs = await getBlogs();

      if (!blogs || blogs.length === 0) {
        setNotification({ message: "No blogs available", type: "info" });
        setBlogs([]);
        return;
      }

      setBlogs(blogs);
    } catch (error) {
      setNotification({ message: "Failed to fetch blogs", type: "error" });
    }
  }, [setNotification]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleToggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  const handleBlogChange = () => {
    setFormVisible(false);
    fetchBlogs();
  };

  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.likes - a.likes),
    [blogs]
  );

  if (!user) {
    return <p>Please log in to view blogs.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <button onClick={handleToggleForm}>
        {isFormVisible ? "Cancel" : "Create New Blog"}
      </button>
      {isFormVisible && (
        <NewBlogForm
          setNotification={setNotification}
          onBlogCreated={handleBlogChange}
        />
      )}
      {sortedBlogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <ul>
          {sortedBlogs.map((blog) => (
            <li key={blog.id}>
              <Blog blog={blog} onBlogUpdated={handleBlogChange} user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

BlogList.propTypes = {
  setNotification: PropTypes.func.isRequired,
};

export default BlogList;
