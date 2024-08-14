// src/components/Notification.jsx
import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification, clearNotification }) => {
  if (!notification) return null

  const { message, type } = notification

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <div
        className="notification-close-button"
        onClick={clearNotification}
      >
        &times;
      </div>
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  }),
  clearNotification: PropTypes.func.isRequired,
}

export default Notification
