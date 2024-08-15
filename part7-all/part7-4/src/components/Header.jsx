import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = ({ isLoggedIn, onLogout }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <header>
      <h1>Blog List | Part 7</h1>
      {isLoggedIn && (
        <nav>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Blogs
          </Link>
          <Link
            to="/new-blog"
            className={location.pathname === '/new-blog' ? 'active' : ''}
          >
            Add Blog
          </Link>
          <Link
            to="/users"
            className={location.pathname === '/users' ? 'active' : ''}
          >
            Users
          </Link>
          <button
            onClick={handleLogout}
            className="logoutBtn"
            aria-label="Logout"
          >
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
