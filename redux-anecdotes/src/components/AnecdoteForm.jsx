import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(content));
    setContent("");
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <button type="submit">Add Anecdote</button>
    </form>
  );
};

export default AnecdoteForm;
