export const ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS";

export const addBookSuccess = (book) => ({
  type: ADD_BOOK_SUCCESS,
  payload: book,
});
