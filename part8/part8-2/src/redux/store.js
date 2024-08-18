import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices/rootReducer";
import { createLogger } from "redux-logger";
import client from "../client"; 

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: client,
      },
    }).concat(logger),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
