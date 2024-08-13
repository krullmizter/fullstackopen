import { combineReducers } from "redux";
import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";

const mainReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export default mainReducer;
