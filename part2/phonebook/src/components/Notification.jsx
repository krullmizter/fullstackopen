import PropTypes from "prop-types";

const Notification = ({ notificationType, message }) => {
  if (!message) {
    return null;
  }

  return <div className={`notification ${notificationType}`}>{message}</div>;
};

Notification.propTypes = {
  notificationType: PropTypes.oneOf(["error", "success", "notification"])
    .isRequired,
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: null,
};

export default Notification;
