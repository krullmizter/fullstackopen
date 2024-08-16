export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const SET_AUTHORS = "SET_AUTHORS";
export const SET_USER = "SET_USER";

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const logout = () => ({
  type: LOGOUT,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuthors = (authors) => ({
  type: SET_AUTHORS,
  payload: authors,
});
