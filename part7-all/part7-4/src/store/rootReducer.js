import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'
import notificationReducer from '../reducers/notificationReducer'
import userListReducer from '../reducers/userListReducer'

const rootReducer = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    userList: userListReducer,
    notification: notificationReducer,
  },
})

export default rootReducer
