/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const Notification = ({ notificationType, message }) => {
  if (!message) {
    return null;
  }

  return <div className={`notification ${notificationType}`}>{message}</div>;
};

export default Notification;
