import { createSlice } from "@reduxjs/toolkit";

export const RecruiterSlice = createSlice({
  name: 'recuiter',
  initialState: {
    isRecruiterLogin: false,
  },
  reducers: {
    setRecruiterLogin:(state,action) => {
      return {...state,...action.payload}
    }
  }
})

export const {setRecruiterLogin} = RecruiterSlice.actions

export default RecruiterSlice.reducer