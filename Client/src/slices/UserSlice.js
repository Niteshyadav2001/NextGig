import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    userApplications: null,
    userToken: null,
    isUserDashboardOpen: false,
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
    },
    setIsUserDashboardOpen:(state,action) => {
      state.isUserDashboardOpen = action.payload;
    }
  }
})

export const {setUserData,setUserApplications,setUserToken, setIsUserDashboardOpen} = UserSlice.actions

export default UserSlice.reducer