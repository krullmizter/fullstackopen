import axios from 'axios'

const baseUrl = '/api/login'

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    const { token, username, name, id } = response.data
    return { token, user: { username, name, id } }
  } catch (error) {
    console.error('Error logging in:', error)
    throw new Error(
      'Login failed. Please check your credentials and try again.'
    )
  }
}
