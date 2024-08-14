import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'

const rootReducer = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})

export default rootReducer
