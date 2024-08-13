const anecdoteRandId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: anecdoteRandId(),
    votes: 0,
  };
};

const initialAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

const initialState = initialAnecdotes.map(asObject);

const ANECDOTE_ADD = "ANECDOTE_ADD";
const ANECDOTE_VOTE_UP = "ANECDOTE_VOTE_UP";

export const createAnecdote = (content) => {
  return {
    type: ANECDOTE_ADD,
    data: {
      content,
      id: anecdoteRandId(),
      votes: 0,
    },
  };
};

export const upvoteAnecdote = (id) => {
  return {
    type: ANECDOTE_VOTE_UP,
    data: { id },
  };
};

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANECDOTE_ADD:
      return [...state, action.data];
    case ANECDOTE_VOTE_UP:
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
