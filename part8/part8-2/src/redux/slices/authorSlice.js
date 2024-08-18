import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_AUTHORS } from "@graphql/queries";

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async (_, { rejectWithValue, extra: client }) => {
    try {
      const { data } = await client.query({
        query: ALL_AUTHORS,
      });
      return data.allAuthors;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authorSlice = createSlice({
  name: "authors",
  initialState: {
    list: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.list = action.payload; 
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const selectAuthors = (state) => state.authors.list;
export const selectError = (state) => state.authors.error;

export default authorSlice.reducer;
