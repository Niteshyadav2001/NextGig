import { createSlice } from "@reduxjs/toolkit";
import { jobsData } from "../assets/assets";

export const JobSlice = createSlice({
  name:"jobs",
  initialState:{ 
    jobs: jobsData,
  },
  reducers:{
    setJobs:(state,action) => {
      return {...state, ...action.payload}
    }
  }
})

export const {setJobs} = JobSlice.actions

export default JobSlice.reducer