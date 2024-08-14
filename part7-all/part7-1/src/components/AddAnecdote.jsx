import { useState } from "react";
import { useField } from "../hooks";
import PropTypes from "prop-types";

const AddAnecdote = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.value.trim() === "") {
      setError("Content is required");
      return;
    }
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    content.reset();
    author.reset();
    info.reset();
    setError("");
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
    setError("");
  };

  return (
    <div className="add-anecdote-form">
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="anecdoteContent">Anecdote</label>
          <textarea
            id="anecdoteContent"
            value={content.value}
            onChange={content.onChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          <label htmlFor="info">Link for more info</label>
          <input
            id="info"
            type="text"
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">Create!</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
};

AddAnecdote.propTypes = {
  addNew: PropTypes.func.isRequired,
};

export default AddAnecdote;
