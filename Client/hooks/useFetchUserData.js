import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUserData, setUserToken } from '../src/slices/UserSlice';

function useFetchUserData() {
  const dispatch = useDispatch()
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { user } = useUser();
  const { getToken } = useAuth();
  
  useEffect(() => {
    // const fetchUserData = async() => {
    //   try {
    //     const token = await getToken();
    //     console.log(token)
      
    //     dispatch(setUserToken({userToken: token}))
  
    //     const { data } = await axios.get(backendAPI+"/api/users/user",
    //       {headers: {Authorization: `Bearer ${token}`,}}
    //     )
  
    //     if(data.success){
    //       console.log("User data sucessfully fetched.")
    //       console.log(data.user)
    //       dispatch(setUserData({userData: data.user}))
    //     } else {
    //       toast.error(data.message)
    //     }
    //   } catch (error) {
    //     toast.error(error.message)
    //   }
    // }

    const fetchData = async () => {
      try {
        // Retrieve the JWT token
        const token = await getToken();
        console.log("Token:", token);
  
        // Use it in API calls
        const response = await fetch('/api/some-endpoint', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if(user){
      fetchData()
    }
  },[backendAPI,dispatch])

  return null
}

export default useFetchUserData