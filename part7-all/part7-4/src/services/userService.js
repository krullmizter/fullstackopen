import axios from 'axios'

const baseUrl = '/api/users'

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials)
    const { token, username, name, id } = response.data
    return { token, user: { username, name, id } }
  } catch (error) {
    console.error('Error logging in:', error)
    throw new Error(
      'Login failed. Please check your credentials and try again.'
    )
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw new Error('Fetching users data failed.')
  }
}
