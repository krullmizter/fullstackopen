import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_USER, REGISTER_USER } from "@graphql/mutations";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue, extra }) => {
    const client = extra;
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_USER,
        variables: { username, password },
      });

      const { user, token } = data.loginUser;
      localStorage.setItem("auth-token", token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, favoriteGenre }, { rejectWithValue, extra }) => {
    const client = extra;
    try {
      const { data } = await client.mutate({
        mutation: REGISTER_USER,
        variables: { username, password, favoriteGenre },
      });
      const { token, user } = data.registerUser;
      localStorage.setItem("auth-token", token);
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("auth-token") || null,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth-token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
