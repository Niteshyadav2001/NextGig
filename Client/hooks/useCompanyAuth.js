import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyToken, setCompanyData } from '../src/slices/CompanySlice';
import { toast } from 'react-toastify';
import axios from "axios";

function useCompanyAuth() {

  const dispatch = useDispatch()
  const backendAPI = useSelector((store) => store.backendAPI.API)
  console.log("backendAPI:"+ backendAPI)
  const companyToken = useSelector((store)=> store.company.companyToken)

  const fetchCompanyData = async() => {
    try {

      console.log("Calling API")
      console.log(companyToken)
      console.log(backendAPI)
      const {data} = await axios.get(backendAPI+'/api/company/company',{headers:{token: companyToken}})

      console.log("✅ API Response:", data);

      if(data.success){
        dispatch(setCompanyData({companyData: data.company}))
        console.log("🟢 Dispatched setCompanyData:", data.company);
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.error("❌ Error fetching company data:", error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken){
      console.log("Company token is not null")
      fetchCompanyData()
    }
  },[companyToken])

  useEffect(() => {
    const companyToken = localStorage.getItem("companyToken");

    if(companyToken){
      dispatch(setCompanyToken({companyToken: companyToken}))
    }
  },[dispatch])

  return { companyToken, fetchCompanyData };
}

export default useCompanyAuth