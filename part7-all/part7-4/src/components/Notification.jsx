import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification.message) return null

  const handleClose = () => {
    dispatch(clearNotification())
  }

  return (
    <div className={`notification ${notification.type}`} role="alert">
      <p>{notification.message}</p>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        className="notification-close-button"
      >
        X
      </button>
    </div>
  )
}

export default Notification
