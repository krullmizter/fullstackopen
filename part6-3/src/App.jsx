import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import { useNotification } from "./context/NotificationContext";
import "./styles.css";

const fetchAnecdotes = async () => {
  const response = await axios.get("http://localhost:3001/anecdotes");
  return response.data;
};

const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

const App = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  const mutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      showNotification(`You voted for "${updatedAnecdote.content}"`, "success");
    },
    onError: (updatedAnecdote) => {
      showNotification(
        `Error voting for "${updatedAnecdote.content}"`,
        "error"
      );
    },
  });

  const {
    data: anecdotes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: fetchAnecdotes,
    retry: false,
  });

  if (isLoading) {
    return <div>Loading anecdote data...</div>;
  }

  if (isError) {
    showNotification(`Error gathering anecdotes: ${error.message}`, "error");
    return (
      <div>
        The anecdote backend service is not available at the moment, can be
        because of problems with the server
      </div>
    );
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    mutation.mutate(updatedAnecdote);
  };

  return (
    <div>
      <h3>Anecdote App | 6-3</h3>
      <Notification />
      <AnecdoteForm />
      <div className="anecdotes-wrapper">
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id} className="anecdote">
            <h3>{anecdote.content}</h3>
            <div>
              Votes: {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>Upvote!</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
