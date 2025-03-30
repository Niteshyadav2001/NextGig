import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
import { setJobs } from '../src/slices/JobSlice';

function useFetchJobs() {
  const dispatch = useDispatch()
  const backendAPI = useSelector((store) => store.backendAPI.API)

  // console.log(backendAPI)

  const fetchJobs = async() => {

    try {
      const { data } = await axios.get(backendAPI+"/api/jobs")
  
      if(data.success){
        dispatch(setJobs({jobs: data.jobs}))
        // console.log("Jobs fetched sucessfully.")
        // console.log(data.jobs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)   
    }
  }

  useEffect(() => {
    if(backendAPI)
      fetchJobs()
  },[backendAPI,dispatch])


}

export default useFetchJobs
  
