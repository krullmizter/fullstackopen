import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const addAnecdote = async (newAnecdote) => {
  const response = await axios.post(
    "http://localhost:3001/anecdotes",
    newAnecdote
  );
  return response.data;
};

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification("A new anecdote was added successfully!", "success");
    },
    onError: (error) => {
      console.error(error);
      showNotification(
        "Failed to add a new anecdote. Make sure it contains at least 5 characters.",
        "error"
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    mutation.mutate({ content, votes: 0 });
  };

  return (
    <div className="anecdote">
      <h3>Create new anecdote</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
