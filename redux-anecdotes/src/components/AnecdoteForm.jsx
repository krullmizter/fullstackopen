import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(
      createAnecdote({
        content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0,
      })
    );
    dispatch(setNotification(`Created a new anecdote: "${content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" placeholder="Enter a new anecdote..." />
      </div>
      <button type="submit">Create anecdote</button>
    </form>
  );
};

export default AnecdoteForm;
