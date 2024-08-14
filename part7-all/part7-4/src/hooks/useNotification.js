import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

export const useNotifications = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  const clear = () => dispatch(clearNotification())

  return { notification, clear }
}
