import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { setBlogs } from '../../reducers/blogReducer'
import { getBlogs } from '../../services/blogService'
import { useAuth } from '../../hooks/useAuth'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const { user: currentUser } = useAuth()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getBlogs()
        dispatch(setBlogs(blogsData))
      } catch (error) {
        console.error('Failed to fetch blogs', error)
      }
    }

    fetchBlogs()
  }, [dispatch])

  return (
    <div>
      <h2>Welcome {currentUser ? currentUser.name : 'Guest'}!</h2>{' '}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} onBlogUpdated={() => {}} />
        ))
      ) : (
        <p>No blogs available...</p>
      )}
    </div>
  )
}

export default BlogList
