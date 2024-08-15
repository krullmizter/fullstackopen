import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from './hooks/useAuth'
import { useNotifications } from './hooks/useNotification'
import Header from './components/Header'
import Notification from './components/Notification'
import AppRoutes from './AppRoutes'

const App = () => {
  const dispatch = useDispatch()
  const { notification, clear } = useNotifications()
  const { user, logout, login } = useAuth()

  const handleLogin = async (credentials) => {
    try {
      await login(credentials)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <>
      <Header isLoggedIn={!!user} onLogout={logout} />
      <Notification
        notification={notification}
        clearNotification={clear}
      />
      <AppRoutes user={user} handleLogin={handleLogin} />
    </>
  )
}

export default App
