import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

export const useNotifications = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const clear = () => {
    dispatch(clearNotification())
  }

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        clear()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, clear])

  return { notification, clear }
}
