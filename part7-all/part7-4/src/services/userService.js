import axios from 'axios'

const baseUrl = '/api/users'

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials)
    const { token, username, name, id } = response.data
    return { token, user: { id, username, name } }
  } catch (error) {
    console.error('Error logging in:', error.message)
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
    console.error('Failed to fetch users:', error.message)
    throw new Error('Fetching users data failed.')
  }
}

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get user:', error.message)
    throw error
  }
}

export const getUserBlogs = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/${userId}/blogs`)
    return response.data
  } catch (error) {
    console.error('Failed to get user blogs:', error.message)
    throw error
  }
}
