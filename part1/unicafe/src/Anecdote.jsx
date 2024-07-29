import React from 'react';

const Anecdote = ({ text, votes, onVote, isMostVoted }) => {
    return (
        <div>
            <p>"<i>{text}</i>"</p>
            <p>Votes: {votes}</p>
            {!isMostVoted && <button onClick={onVote}>Vote</button>}
        </div>
    );
};

export default Anecdote;
