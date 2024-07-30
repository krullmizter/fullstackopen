/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const Notification = ({ type, message }) => {
  if (!message) return null;

  const notificationClass = `notification ${type}`;

  return <div className={notificationClass}>{message}</div>;
};

export default Notification;
