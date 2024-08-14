import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../services/authService'
import { setUser, clearUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser as setLocalUser,
} from '../utils/localStorage'

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const token = getToken()

  React.useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      dispatch(setUser(storedUser))
    }
  }, [dispatch])

  const login = async (credentials) => {
    try {
      const { id, username, name, token } = await loginUser(credentials)
      setToken(token)
      setLocalUser({ id, username, name })
      dispatch(setUser({ id, username, name }))
      dispatch(
        setNotification({ message: 'Login successful', type: 'success' })
      )
    } catch (error) {
      dispatch(
        setNotification({
          message: 'Login failed: ' + error.message,
          type: 'error',
        })
      )
    }
  }

  const logout = () => {
    removeToken()
    setLocalUser(null)
    dispatch(clearUser())
    dispatch(
      setNotification({
        message: 'Logged out successfully',
        type: 'success',
      })
    )
  }

  return { user, token, login, logout }
}
