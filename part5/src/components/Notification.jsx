import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Notification = ({ notification, clearNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotification();
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div
      className={`notification ${notification.type}`}
      aria-live="assertive"
      aria-atomic="true"
    >
      <p>{notification.message}</p>
      <button
        onClick={clearNotification}
        aria-label="Close notification"
        className="notification-close-button"
      >
        &times;
      </button>
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.oneOf(["success", "error", "info"]),
  }),
  clearNotification: PropTypes.func.isRequired,
};

export default Notification;
