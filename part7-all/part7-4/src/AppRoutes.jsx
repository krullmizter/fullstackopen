import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import BlogList from './components/Blog/BlogList'
import NewBlogForm from './components/Blog/NewBlogForm'
import UserList from './components/User/UserList'
import UserProfile from './components/User/UserProfile'
import Blog from './components/Blog/Blog'
import LoginForm from './components/LoginForm'

const AppRoutes = ({ user, handleLogin }) => (
  <Routes>
    {user ? (
      <>
        <Route path="/" element={<BlogList />} />
        <Route path="/new-blog" element={<NewBlogForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    ) : (
      <Route path="/" element={<LoginForm handleLogin={handleLogin} />} />
    )}
  </Routes>
)

export default AppRoutes
