const ANECDOTE_CREATE = "ANECDOTE_CREATE";
const ANECDOTE_UPVOTE = "ANECDOTE_UPVOTE";

export const createAnecdote = (content) => {
  return {
    type: ANECDOTE_CREATE,
    data: {
      content,
      id: anecdoteRandId(),
      votes: 0,
    },
  };
};

export const voteAnecdote = (id) => {
  return {
    type: ANECDOTE_UPVOTE,
    data: { id },
  };
};

const anecdoteRandId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: anecdoteRandId(),
    votes: 0,
  };
};

const initAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

const initState = initAnecdotes.map(asObject);

const anecdoteReducer = (state = initState, action) => {
  switch (action.type) {
    case ANECDOTE_CREATE:
      return [...state, action.data];
    case ANECDOTE_UPVOTE:
      const id = action.data.id;
      return state
        .map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
};

export default anecdoteReducer;
