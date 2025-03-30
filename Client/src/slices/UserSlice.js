import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    userApplications: null,
    userToken: null,
  },
  reducers: {
    setUserData:(state,action) => {
      return { ...state, ...action.payload}
    },
    setUserApplications:(state,action) => {
      return { ...state, ...action.payload}
    },
    setUserToken:(state,action) => {
      return {...state, ...action.payload}
    }
  }
})

export const {setUserData,setUserApplications,setUserToken} = UserSlice.actions

export default UserSlice.reducer