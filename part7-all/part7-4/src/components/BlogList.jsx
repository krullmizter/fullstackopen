import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../services/blogService";
import { setBlogs } from "../reducers/blogReducer";
import NewBlogForm from "./NewBlogForm";
import Blog from "./Blog";
import { getUser } from "../utils/localStorage";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [isFormVisible, setFormVisible] = React.useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await getBlogs();
        dispatch(setBlogs(blogs || []));
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  const handleToggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  const handleBlogChange = useCallback(async () => {
    try {
      const blogs = await getBlogs();
      dispatch(setBlogs(blogs || []));
    } catch (error) {
      console.error("Failed to refresh blogs", error);
    }
  }, [dispatch]);

  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.likes - a.likes),
    [blogs]
  );

  if (!user) {
    return <p>Please log in to view blogs.</p>;
  }

  return (
    <div className="blog-list-container">
      <h2 className="welcome-message">Welcome, {user.name}</h2>
      <button className="create-blog-button" onClick={handleToggleForm}>
        {isFormVisible ? "Cancel" : "Add Blog"}
      </button>
      {isFormVisible && <NewBlogForm onBlogCreated={handleBlogChange} />}
      {sortedBlogs.length === 0 ? (
        <p className="no-blogs-message">No blogs available.</p>
      ) : (
        <ul className="blog-list">
          {sortedBlogs.map((blog) => (
            <li key={blog.id} className="blog-list-item">
              <Blog blog={blog} onBlogUpdated={handleBlogChange} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
