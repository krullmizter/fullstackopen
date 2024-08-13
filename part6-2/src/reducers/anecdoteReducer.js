import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      return state
        .map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setAnecdotes, voteAnecdote, createAnecdote } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get("http://localhost:3001/anecdotes");
    dispatch(setAnecdotes(response.data));
  };
};
