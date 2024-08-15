import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setNotification(state, action) {
      return { ...action.payload }
    },
    clearNotification() {
      return { message: '', type: '' }
    },
  },
})

export const { setNotification, clearNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
