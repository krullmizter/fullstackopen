import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getBlog,
  updateBlog,
  deleteBlog,
} from '../../services/blogService'
import { useAuth } from '../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import {
  likeBlog,
  commentBlog,
  removeBlog,
} from '../../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()
  const { token, user } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [isLiking, setIsLiking] = useState(false)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogResponse = await getBlog(id)
        setBlog(blogResponse)
      } catch (error) {
        console.error('Failed to fetch blog:', error)
      }
    }

    fetchBlog()
  }, [id])

  const handleLike = useCallback(async () => {
    if (!token || !blog) return

    setIsLiking(true)

    try {
      const updatedBlog = await updateBlog(
        blog.id,
        { ...blog, likes: blog.likes + 1 },
        token
      )
      setBlog(updatedBlog)
      dispatch(likeBlog(updatedBlog))
      dispatch(
        setNotification({
          message: `You liked: ${updatedBlog.title}!`,
          type: 'success',
        })
      )
    } catch (error) {
      console.error('Failed to like blog', error)
    } finally {
      setIsLiking(false)
    }
  }, [blog, dispatch, token])

  const handleAddComment = useCallback(async () => {
    if (!token || !newComment.trim() || !blog) return

    try {
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to add comment')
      }

      const updatedBlog = await response.json()
      setBlog(updatedBlog)
      setNewComment('')
      dispatch(commentBlog(updatedBlog))
      dispatch(
        setNotification({
          message: 'Comment added successfully!',
          type: 'success',
        })
      )
    } catch (error) {
      console.error('Failed to add comment:', error)
      dispatch(
        setNotification({
          message: 'Failed to add comment. Please try again.',
          type: 'error',
        })
      )
    }
  }, [blog, newComment, dispatch, token])

  const handleDelete = async () => {
    if (!token || !blog) return

    try {
      await deleteBlog(blog.id, token)
      dispatch(removeBlog(blog.id))
      dispatch(
        setNotification({
          message: `Blog "${blog.title}" deleted successfully!`,
          type: 'success',
        })
      )
      navigate('/blogs')
    } catch (error) {
      console.error('Failed to delete blog:', error)
      dispatch(
        setNotification({
          message: 'Failed to delete blog. Please try again.',
          type: 'error',
        })
      )
    }
  }

  if (!blog) return <p>Loading blog...</p>

  return (
    <div className="blog-detail">
      <h2 className="blog-detail__title">{blog.title}</h2>
      <p className="blog-detail__author">
        <strong>Author:</strong> {blog.author}
      </p>
      <p className="blog-detail__url">
        <strong>URL:</strong>{' '}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <div className="blog-detail__likes">
        <strong>Likes:</strong> {blog.likes}
        <button
          className="blog-detail__like-button"
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiking ? 'Liking...' : 'Like'}
        </button>
      </div>
      <i>Blog owner: {blog.user.name}</i>
      <h3 className="blog-detail__comments-title">Comments:</h3>
      <ul className="blog-detail__comments-list">
        {blog.comments.map((comment, index) => (
          <li key={index} className="blog-detail__comment-item">
            {comment}
          </li>
        ))}
      </ul>
      <div className="blog-detail__comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="blog-detail__comment-field input"
        />
        <button
          className="blog-detail__add-comment-button"
          onClick={handleAddComment}
        >
          Add Comment
        </button>
      </div>
      {user && blog.user && user.id === blog.user.id && (
        <button
          className="blog-detail__delete-button delete-button"
          onClick={handleDelete}
        >
          Delete Blog
        </button>
      )}
    </div>
  )
}

export default Blog
