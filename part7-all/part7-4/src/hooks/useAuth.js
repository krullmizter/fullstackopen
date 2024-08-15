import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../services/userService'
import {
  setUser as setUserInStore,
  clearUser,
} from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  getToken,
  setToken,
  removeUserAndToken,
  getUser,
  setUser as setUserInLocalStorage,
} from '../utils/localStorage'

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const token = useMemo(() => getToken(), [])

  useEffect(() => {
    const storedUser = getUser()
    if (storedUser) {
      dispatch(setUserInStore(storedUser))
    }
  }, [dispatch])

  const login = async (credentials) => {
    try {
      const { token, user: userData } = await loginUser(credentials)
      setToken(token)
      setUserInLocalStorage(userData)
      dispatch(setUserInStore(userData))
      dispatch(
        setNotification({ message: 'Login successful', type: 'success' })
      )
    } catch (error) {
      console.error('Login error:', error)
      dispatch(
        setNotification({
          message: `Login failed: ${error.response?.data?.error || error.message}`,
          type: 'error',
        })
      )
    }
  }

  const logout = () => {
    removeUserAndToken()
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
