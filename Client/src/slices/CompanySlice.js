import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: 'company',
  initialState : {
    companyToken: null,
    companyData: null,
  },
  reducers: {
    setCompanyToken: (state,action) => {
      state.companyToken = action.payload
    },
    setCompanyData: (state,action) => {
      state.companyData = action.payload
    },
  }
})

export const {setCompanyToken,setCompanyData} = companySlice.actions

export default companySlice.reducer