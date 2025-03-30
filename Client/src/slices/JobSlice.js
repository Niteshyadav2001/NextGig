import { createSlice } from "@reduxjs/toolkit";

// all jobs are fetched in a hook named useFetchJobs and this hook called in app.jsx

export const JobSlice = createSlice({
  name:"jobs",
  initialState:{ 
    jobs: [],
  },
  reducers:{
    setJobs:(state,action) => {
      return {...state, ...action.payload}
    }
  }
})

export const {setJobs} = JobSlice.actions

export default JobSlice.reducer