import React, { useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

function ViewApplications() {
  const [ applicants, setApplicants ] = useState([])
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { companyToken } = useSelector((store) => store.company)

  const fetchCompanyJobApplications = async() => {
    try {
      const { data } = await axios.get(backendAPI+'/api/company/applicants',
        {headers: {token: companyToken},}
      );

      console.log(data.applicants)  
  
      if(data.success){
        setApplicants(data.applicants.reverse())
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken){
      fetchCompanyJobApplications()
    }
  },[companyToken])

  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr className='border-b '>
              <th className='px-4 py-2 text-left'>#</th>
              <th className='px-4 py-2 text-left'>User Name</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Job Title</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
              <th className='px-4 py-2 text-left'>Resume</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              applicants.map((applicant,index) => (
                <tr key={index} className='text-gray-700'>
                  <td className='px-4 py-2 border-b text-center'>{index+1}</td>
                  <td className='px-4 py-2 border-b text-center'>
                    <div className='flex items-center'>
                      <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                      <span>{applicant.userId.name}</span>
                    </div>
                  </td>
                  <td className='px-4 py-2 border-b max-sm:hidden'>{applicant.jobId.title}</td>
                  <td className='px-4 py-2 border-b max-sm:hidden'>{applicant.jobId.location}</td>
                  <td className='px-4 py-2 border-b'>
                    <a className='bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center' href="" target='_blank'>
                      Resume 
                      <img src={assets.resume_download_icon} alt="" />
                    </a>
                  </td>
                  <td className='px-4 py-2 border-b relative'>
                    <div className='relative inline-block text-left group'>
                      <button className='text-gray-500 action-button'>...</button>
                      <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                        <button className='block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100 cursor-pointer'>
                          Accept
                        </button>
                        <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer'>
                          Reject
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications