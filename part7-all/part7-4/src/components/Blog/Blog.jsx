  import React, { useState, useCallback, useMemo } from 'react'
  import { useDispatch } from 'react-redux'
  import PropTypes from 'prop-types'
  import { likeBlog, removeBlog } from '../../reducers/blogReducer'
  import { updateBlog, deleteBlog } from '../../services/blogService'
  import { setNotification } from '../../reducers/notificationReducer'
  import { useAuth } from '../../hooks/useAuth'

  const Blog = ({ blog, onBlogUpdated }) => {
    const [showDetails, setShowDetails] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { user: currentUser, token } = useAuth()

    const handleToggleDetails = useCallback(() => {
      setShowDetails((prev) => !prev)
    }, [])

    const handleLike = useCallback(async () => {
      if (!token) return
      try {
        setIsLoading(true)
        const updatedBlog = await updateBlog(
          blog.id,
          { likes: blog.likes + 1 },
          token
        )
        dispatch(likeBlog(updatedBlog))
        onBlogUpdated()
        dispatch(
          setNotification({
            message: `You liked: ${updatedBlog.title}!`,
            type: 'success',
          })
        )
      } catch (error) {
        console.error('Failed to like blog', error)
      } finally {
        setIsLoading(false)
      }
    }, [blog, dispatch, onBlogUpdated, token])

    const handleDelete = useCallback(async () => {
      if (!token) return
      if (!window.confirm('Are you sure you want to delete this blog?'))
        return
      try {
        setIsLoading(true)
        await deleteBlog(blog.id, token)
        dispatch(removeBlog(blog.id))
        onBlogUpdated()
        dispatch(
          setNotification({
            message: 'Blog deleted successfully',
            type: 'success',
          })
        )
      } catch (error) {
        console.error('Failed to delete blog', error)
      } finally {
        setIsLoading(false)
      }
    }, [blog.id, dispatch, onBlogUpdated, token])

    const canDelete = useMemo(() => {
      return currentUser && blog.user && currentUser.id === blog.user.id
    }, [currentUser, blog.user])

    return (
      <div className="blog-item">
        <div className="blog-summary">
          <h2 className="blog-title">
            {blog.title}
            {blog.user.name === currentUser.name
              ? ` by ${blog.author}`
              : ' by unknown'}
          </h2>
          <div className="blog-buttons-container">
            <button className="toggle-details" onClick={handleToggleDetails}>
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
            {canDelete && (
              <button
                className="delete-blog delete-button"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        </div>
        {showDetails && (
          <div className="blog-details">
            <p className="blog-url">
              URL:{' '}
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </p>
            <p className="blog-likes">
              Likes: {blog.likes}
              <button onClick={handleLike} disabled={isLoading}>
                {isLoading ? 'Liking...' : 'Like'}
              </button>
            </p>
            <p className="blog-author">Added by: {currentUser.name}</p>
          </div>
        )}
      </div>
    )
  }

  Blog.propTypes = {
    blog: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      comments: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onBlogUpdated: PropTypes.func.isRequired,
  }

  export default Blog
