import { ADD_BOOK_SUCCESS } from "../actions/bookActions";

const initialState = {
  books: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    default:
      return state;
  }
};

export default bookReducer;
