import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: action.payload.likes }
          : blog
      )
    },
    commentBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, comments: action.payload.comments }
          : blog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, likeBlog, commentBlog, removeBlog, addBlog } =
  blogSlice.actions
export default blogSlice.reducer
