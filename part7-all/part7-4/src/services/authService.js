import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api'

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials)
    if (response.status !== 200) {
      throw new Error('Login failed')
    }
    const { id, username, name, token } = response.data
    return { id, username, name, token }
  } catch (error) {
    throw new Error('Login failed')
  }
}
