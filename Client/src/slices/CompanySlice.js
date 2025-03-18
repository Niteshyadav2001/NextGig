import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: 'company',
  initialState : {
    companyToken: null,
    companyData: null,
  },
  reducers: {
    setCompanyToken: (state,action) => {
      return {...state,...action.payload}
    },
    setCompanyData: (state,action) => {
      return {...state,...action.payload}
    },
  }
})

export const {setCompanyToken,setCompanyData} = companySlice.actions

export default companySlice.reducer