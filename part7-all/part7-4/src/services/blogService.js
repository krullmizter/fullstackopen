import axios from 'axios'

const baseUrl = '/api/blogs'

const handleRequest = async (request) => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    console.error('Request failed:', error)
    throw error 
  }
}

export const getBlogs = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error('Failed to fetch blogs', error)
    return []
  }
}

export const createBlog = (blog, token) =>
  handleRequest(() =>
    axios.post(baseUrl, blog, {
      headers: { Authorization: `Bearer ${token}` },
    })
  )

export const updateBlog = async (id, updatedBlog, token) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error('Failed to update blog:', error)
    throw error
  }
}

export const deleteBlog = (id, token) =>
  handleRequest(() =>
    axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  )
