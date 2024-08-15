import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUser } from '../../services/userService'
import { getBlogs } from '../../services/blogService'

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserAndBlogs = async () => {
      setLoading(true)
      try {
        const userResponse = await getUser(userId)
        setUser(userResponse)

        const blogsResponse = await getBlogs(userId)
        setBlogs(blogsResponse)
      } catch (error) {
        console.error('Failed to fetch user or blogs:', error)
        setError(
          'Failed to load user data or blogs. Please try again later.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndBlogs()
  }, [userId])

  if (loading) return <p>Loading user data...</p>
  if (error) return <p className="error-message">{error}</p>
  if (!user) return <p>No user found.</p>

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Blog Count:</strong> {blogs.length}
      </p>
      <h3>Blogs:</h3>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h4>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h4>
            <p>
              <strong>Author:</strong> {blog.author}
            </p>
            <p>
              <strong>URL:</strong>{' '}
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </p>
            <p>
              <strong>Likes:</strong> {blog.likes}
            </p>
          </div>
        ))
      ) : (
        <p>No blogs found for this user...</p>
      )}
    </div>
  )
}

export default UserProfile
