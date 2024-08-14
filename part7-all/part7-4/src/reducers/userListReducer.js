import { createSlice } from '@reduxjs/toolkit'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    clearUsers() {
      return []
    },
  },
})

export const { setUsers, clearUsers } = userListSlice.actions
export default userListSlice.reducer
