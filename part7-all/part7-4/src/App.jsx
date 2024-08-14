import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import store from './store/rootReducer'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import BlogList from './components/Blog/BlogList'
import NewBlogForm from './components/Blog/NewBlogForm'
import Notification from './components/Notification'
import { useAuth } from './hooks/useAuth'
import { useNotifications } from './hooks/useNotification'
import UserList from './components/User/UserList'

const AppContent = () => {
  const { notification, clear } = useNotifications()
  const { user, login, logout } = useAuth()

  return (
    <Router>
      <Header isLoggedIn={!!user} onLogout={logout} />
      <Notification
        notification={notification}
        clearNotification={clear}
      />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<BlogList />} />
            <Route
              path="/new-blog"
              element={
                <NewBlogForm
                  onBlogCreated={() =>
                    dispatch(
                      setNotification({
                        message: 'Blog created successfully',
                        type: 'success',
                      })
                    )
                  }
                />
              }
            />
            <Route path="/users" element={<UserList />} />{' '}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route path="/" element={<LoginForm handleLogin={login} />} />
        )}
      </Routes>
    </Router>
  )
}

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
)

export default App
