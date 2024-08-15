import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../services/userService'
import { setUsers } from '../../reducers/userListReducer'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userList)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const usersData = await getUsers()
        dispatch(setUsers(usersData))
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setError('Failed to load users. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [dispatch])

  if (loading) return <p>Loading users...</p>

  return (
    <div>
      <h2>All Users</h2>
      {error && <p className="error-message">{error}</p>}
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="user-item">
            <p>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
              <span>
                {user.blogs.length === 0
                  ? ' owns no blogs...'
                  : ` owns ${user.blogs.length} blog${user.blogs.length > 1 ? 's' : ''}`}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p>No users available...</p>
      )}
    </div>
  )
}

export default UserList
