import axios from 'axios'

const baseUrl = '/api/blogs'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      console.warn('No data found:', error.response.data)
      error.isNoDataError = true
      return Promise.resolve({ data: [] })
    }
    return Promise.reject(error)
  }
)

const catchReqError = (error, action) => {
  console.error(`Failed to ${action}:`, error.message)
  throw error
}

export const getBlogs = async (userId) => {
  try {
    const response = await axios.get(baseUrl, { params: { userId } })
    return response.data
  } catch (error) {
    catchReqError(error, 'get all the blogs')
  }
}

export const getBlog = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    catchReqError(error, 'get the blog')
  }
}

export const createBlog = async (blog, token) => {
  try {
    const response = await axios.post(baseUrl, blog, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    catchReqError(error, 'create the blog')
  }
}

export const updateBlog = async (id, updatedBlog, token) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    catchReqError(error, 'update the blog')
  }
}

export const deleteBlog = async (id, token) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    catchReqError(error, 'delete the blog')
  }
}
