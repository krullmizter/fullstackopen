import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";
import { createBlog } from "../services/blogService";
import { getToken } from "../utils/localStorage";
import { setNotification } from "../reducers/notificationReducer";

const NewBlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    try {
      const newBlog = await createBlog({ title, author, url }, token);
      dispatch(addBlog(newBlog));
      onBlogCreated();
      dispatch(
        setNotification({
          message: `Blog ${newBlog.title} added!`,
          type: "success",
        })
      );
    } catch (error) {
      console.error("Failed to create blog", error);
      dispatch(
        setNotification({
          message: "Failed to create blog.",
          type: "error",
        })
      );
    }
  };

  return (
    <form className="new-blog-form" onSubmit={handleSubmit}>
      <h2>Create a New Blog</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="Enter author's name"
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Enter blog URL"
        />
      </div>
      <div className="blog-buttons-container">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

NewBlogForm.propTypes = {
  onBlogCreated: PropTypes.func.isRequired,
};

export default NewBlogForm;
