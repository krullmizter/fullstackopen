import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../hooks/useAuth'

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation()
  const { pathname } = location
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header>
      <h1>Blog List | Part 7</h1>
      {isLoggedIn && (
        <nav>
          <Link to="/" className={pathname === '/' ? 'active' : ''}>
            Blogs
          </Link>
          <Link
            to="/new-blog"
            className={pathname === '/new-blog' ? 'active' : ''}
          >
            Add Blog
          </Link>
          <Link
            to="/users"
            className={pathname === '/users' ? 'active' : ''}
          >
            Users
          </Link>
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        </nav>
      )}
    </header>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default Header
