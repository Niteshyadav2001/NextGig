import React, { useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function ViewApplications() {
  const [ applicants, setApplicants ] = useState(null)
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { companyToken } = useSelector((store) => store.company)

  const fetchCompanyJobApplications = async() => {
    try {
      const { data } = await axios.get(backendAPI+'/api/company/applicants',
        {headers: {token: companyToken},}
      );

      // console.log(data.applicants)   
  
      if(data.success){
        setApplicants(data.applicants.reverse())
      } else {
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to update job application status
  const changeJobApplicationStatus = async(id,status) => {
    try {

      const { data } = await axios.post(backendAPI+'/api/company/change-status',
        {id,status},
        {headers: {token: companyToken}}
      )

      if(data.success){
        toast.success("State updated successfully")
        fetchCompanyJobApplications()
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

  return applicants ? applicants.length === 0 ? ( 
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl sm:text-2xl">No Applications Available</p>
    </div> 
   ) : (
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
              applicants.filter( item => item.jobId && item.userId).map((applicant,index) => (
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
                    <a className='bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex gap-2 items-center' href={applicant.userId.resume} target='_blank' rel="noopener noreferrer">
                      Resume 
                      <img src={assets.resume_download_icon} alt="Download Resume" />
                    </a>
                  </td>
                  <td className='px-4 py-2 border-b relative'>
                    { applicant.status === "Pending" 
                      ?
                      <div className='relative inline-block text-left group'>
                        <button className='text-gray-500 action-button'>...</button>
                        <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                          <button onClick={() => changeJobApplicationStatus(applicant._id,'Accepted')} className='block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100 cursor-pointer'>
                            Accept
                          </button>
                          <button onClick={() => changeJobApplicationStatus(applicant._id,'Rejected')} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer'>
                            Reject
                          </button>
                        </div>
                      </div>
                      :
                      <div>{applicant.status}</div>
                    }
                  </td>
                </tr>

              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  ) 
  : 
  <Loading />
}

export default ViewApplications