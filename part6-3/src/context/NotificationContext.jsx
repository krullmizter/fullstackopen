import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

const NOTIFICATION_SHOW = "NOTIFICATION_SHOW";
const NOTIFICATION_HIDE = "NOTIFICATION_HIDE";

const initialState = {
  message: "",
  type: "",
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case NOTIFICATION_SHOW:
      return { message: action.payload.message, type: action.payload.type };
    case NOTIFICATION_HIDE:
      return { message: "", type: "" };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message, type = "success") => {
    dispatch({
      type: NOTIFICATION_SHOW,
      payload: { message, type },
    });

    setTimeout(() => {
      dispatch({ type: NOTIFICATION_HIDE });
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ state, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNotification = () => useContext(NotificationContext);
