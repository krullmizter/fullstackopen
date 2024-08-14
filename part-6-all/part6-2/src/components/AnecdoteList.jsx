import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(id));
    dispatch(setNotification(`Voted for anecdote: "${anecdote.content}"`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div className="anecdote" key={anecdote.id}>
          <h3>{anecdote.content}</h3>
          <div className="anecdote-wrap">
            Votes: {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>Upvote!</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
