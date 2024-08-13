const ANECDOTE_SET_FILTER = "ANECDOTE_SET_FILTER";

export const setFilter = (filter) => {
  return {
    type: ANECDOTE_SET_FILTER,
    filter,
  };
};

const initState = "";

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case ANECDOTE_SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
