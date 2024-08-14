import PropTypes from 'prop-types';

const Notification = ({ message, type }) => {
  if (!message) return null;

  const notificationClass = type ? `notification ${type}` : "notification";

  return <div className={notificationClass}>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Notification;
