import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_BOOK } from "@graphql/mutations";
import { ALL_BOOKS, RECOMMENDED_BOOKS } from "@graphql/queries";
import client from "../../client";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: ALL_BOOKS,
      });
      return data.allBooks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRecommendedBooks = createAsyncThunk(
  "books/fetchRecommendedBooks",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: RECOMMENDED_BOOKS,
      });
      return data.recommendedBooks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (
    { title, author, yearPublished, genres },
    { rejectWithValue, extra: client }
  ) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_BOOK,
        variables: { title, author, yearPublished, genres },
      });
      return data.addBook;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    recommendedBooks: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecommendedBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.recommendedBooks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
