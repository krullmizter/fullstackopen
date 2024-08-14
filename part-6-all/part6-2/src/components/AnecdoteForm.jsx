import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import axios from "axios";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = {
      content,
      votes: 0,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/anecdotes",
        newAnecdote
      );
      dispatch(createAnecdote(response.data));
      dispatch(setNotification(`Created a new anecdote: "${content}"`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    } catch (error) {
      console.error("Failed to create a anecdote:", error);
      dispatch(
        setNotification("Failed to create a anecdote. Please try again...")
      );
      setTimeout(() => dispatch(clearNotification()), 5000);
    }
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
