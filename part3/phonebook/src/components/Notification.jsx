import PropTypes from "prop-types";

const Notification = ({ type, message }) => {
  if (!message) return null;

  const notificationClass = `notification notification--${type}`;

  return <div className={notificationClass}>{message}</div>;
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
