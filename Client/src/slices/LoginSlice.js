import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: 'login',
  initialState: {
    isRecruiterLogin: false,
    isUserLogin: false,
  },
  reducers: {
    setRecruiterLogin:(state,action) => {
      state.isRecruiterLogin = action.payload;
    },
    setUserLogin: (state,action) => {
      state.isUserLogin = action.payload;
    },
  }
})

export const {setRecruiterLogin,setUserLogin} = LoginSlice.actions

export default LoginSlice.reducer