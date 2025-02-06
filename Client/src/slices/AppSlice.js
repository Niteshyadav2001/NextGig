import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
  name:"app",
  initialState:{ 
    title: null,
    location: null,
    isSearched: false,
  },
  reducers:{
    setSearchFilter:(state,action) => {
      return {...state, ...action.payload}
    }
  }
})

export const {setSearchFilter} = AppSlice.actions

export default AppSlice.reducer