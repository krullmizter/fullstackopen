import {
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  SET_AUTHORS,
  SET_USER,
} from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("auth-token") || null,
  user: null,
  authors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case SET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
