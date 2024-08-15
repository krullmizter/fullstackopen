import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setBlogs } from '../../reducers/blogReducer'
import { getBlogs } from '../../services/blogService'
import { useAuth } from '../../hooks/useAuth'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { user: currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const blogsData = await getBlogs()
        dispatch(setBlogs(blogsData))
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
        setError('Failed to load blogs. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [dispatch])

  if (loading) return <p>Loading blogs...</p>

  return (
    <div>
      <h2 className="welcome-message">
        Welcome {currentUser ? currentUser.name : 'Guest'}!
      </h2>
      <h3>All Blogs</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="blog-items">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-item">
              <h2 className="blog-title">
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                {` by ${blog.author}`}
              </h2>
            </div>
          ))
        ) : (
          <p>No blogs available...</p>
        )}
      </div>
    </div>
  )
}

export default BlogList
