import { useState, useCallback } from "react";
import { createBlog } from "../services/blogService";
import { getToken } from "../utils/localStorage";

const NewBlogForm = ({ setNotification, onBlogCreated }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateBlog = useCallback(
    async (event) => {
      event.preventDefault();

      if (!title || !author || !url) {
        setNotification({ message: "All fields are required", type: "error" });
        return;
      }

      const token = getToken();
      if (!token) {
        setNotification({
          message: "User is not authenticated",
          type: "error",
        });
        return;
      }

      try {
        setIsSubmitting(true);
        await createBlog({ title, author, url }, token);
        setNotification({
          message: "Blog added successfully",
          type: "success",
        });
        onBlogCreated();
        setTitle("");
        setAuthor("");
        setUrl("");
      } catch (error) {
        setNotification({ message: "Failed to add blog", type: "error" });
      } finally {
        setIsSubmitting(false);
      }
    },
    [title, author, url, setNotification, onBlogCreated]
  );

  return (
    <form
      onSubmit={handleCreateBlog}
      style={{ display: "flex", flexDirection: "column", width: "300px" }}
    >
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
};

export default NewBlogForm;
