export const getToken = () => window.localStorage.getItem('token')

export const getUser = () => {
  const user = window.localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user))
}

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const removeUserAndToken = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
}
