import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../services/userService'
import { setUsers } from '../../reducers/userListReducer'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.userList)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers()
        dispatch(setUsers(usersData))
      } catch (error) {
        console.error('Failed to fetch data of users:', error)
      }
    }

    fetchUsers()
  }, [dispatch])

  if (!users) {
    return <p>Loading users...</p>
  }

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Blog Count:</strong> {user.blogs.length}
              </p>
            </li>
          ))
        ) : (
          <p>No users available...</p>
        )}
      </ul>
    </div>
  )
}

export default UserList
