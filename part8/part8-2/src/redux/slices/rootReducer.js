import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookReducer from "./bookSlice";
import authorReducer from "./authorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  authors: authorReducer,
});

export default rootReducer;
