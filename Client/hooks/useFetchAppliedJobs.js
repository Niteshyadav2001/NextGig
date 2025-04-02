import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserApplications } from '../src/slices/UserSlice'
import { toast } from 'react-toastify'

export const useFetchAppliedJobs =() => {
  const dispatch = useDispatch()
  const { userToken } = useSelector((store) => store.user)
  const backendAPI = useSelector((store) => store.backendAPI.API)


  const fetchAppliedJobs = async() => {
    try {
      
      const { data } = await axios.get(backendAPI+"/api/users/applications",
        {headers: {token: userToken}}
      )

      if(data.success){
        dispatch(setUserApplications(data.applications))
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if(userToken)
        fetchAppliedJobs()
  },[userToken,dispatch])



  return {refetch : fetchAppliedJobs}
}

// export default useFetchAppliedJobs