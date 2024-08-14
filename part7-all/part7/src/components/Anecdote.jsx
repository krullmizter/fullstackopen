import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  if (!anecdote) return <p>Couldn&apos;t find any anecdotes to load...</p>;

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <ul>
        <li>
          Author: <span>{anecdote.author || "No author provided..."}</span>
        </li>
        <li>
          Votes: <span>{anecdote.votes || "No votes yet... Vote!"}</span>
        </li>
      </ul>
      {anecdote.info && (
        <i>
          For additional information see:{" "}
          <a href={anecdote.info} target="_blank" rel="noreferrer">
            {anecdote.info}
          </a>
        </i>
      )}
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};

export default Anecdote;
