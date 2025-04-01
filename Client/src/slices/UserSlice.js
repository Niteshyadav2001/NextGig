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
      state.userData = action.payload;
    },
    setUserApplications:(state,action) => {
      state.userApplications = action.payload;
    },
    setUserToken:(state,action) => {
      state.userToken = action.payload;
    }
  }
})

export const {setUserData,setUserApplications,setUserToken} = UserSlice.actions

export default UserSlice.reducer