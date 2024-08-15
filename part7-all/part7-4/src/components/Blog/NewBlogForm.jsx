import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../../services/blogService'
import { addBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { getToken } from '../../utils/localStorage'

const NewBlogForm = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const newBlog = await createBlog({ title, author, url }, getToken())
      dispatch(addBlog(newBlog))
      if (onBlogCreated) onBlogCreated()
      dispatch(
        setNotification({
          message: `Blog "${newBlog.title}" added successfully!`,
          type: 'success',
        })
      )
      navigate('/')
    } catch (error) {
      console.error('Failed to create blog:', error)
      dispatch(
        setNotification({
          message: 'Failed to create blog. Please try again.',
          type: 'error',
        })
      )
    } finally {
      setIsLoading(false)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title*"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author*"
          required
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL*"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
