import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';
import { setUserData } from '../slices/UserSlice'
import { useNavigate } from 'react-router-dom'
import { useFetchAppliedJobs } from '../../hooks/useFetchAppliedJobs'

function Applications() {

  const [isEdit, setIsEdit] = useState(true)
  const [resume,setResume] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { refetch } = useFetchAppliedJobs()

  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { userData, userApplications, userToken } = useSelector((store) => store.user)

  useEffect(() => {
    setIsEdit(!userData?.resume);
  }, [userData]);

  const updateResume = async() => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)

      const { data } = await axios.post(backendAPI+'/api/users/update-resume',
        formData,
        {headers: {token: userToken}}
      )

      if(data.success){
        dispatch(setUserData(data.user))
        navigate('/')
        setResume(data.user.resume)
        toast.success("Resume updated")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(userToken){
      refetch()
    }
  },[userToken])


  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[75vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          { isEdit || userData && userData.resume === ""
            ?<>
              <label className='flex items-center' htmlFor="resumeUpload">
                <p className='bg-blue-100 text-blue-600 rounded-lg px-4 py-2 mr-2'>{resume ? resume.name : "Select Resume"}</p>
                <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
            
            </>
            : <div className='flex gap-2'>
              <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href={userData.resume} target='_blank'>Resume</a>
              <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>Edit</button>
            </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <table className='border rounded-lg min-w-full bg-white border-gray-300'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b border-gray-300 text-left'>Company</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left'>Job Title</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left'>Location</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b border-gray-300 text-left' >Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job,index) => true?(
              <tr key={index}>
                <td className='py-3 px-4 border-b border-gray-300 align-middle'>
                  <div className="flex items-center gap-x-2">
                    <img className='w-8 h-8 object-contain' src={job.companyId.image} alt="" />
                    <span>{job.companyId.name}</span>
                  </div>
                </td>
                <td className='py-2 px-4 border-b border-gray-300'>{job.jobId.title}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{job.jobId.location}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{moment(job.date, "DD MMM, YYYY").format('ll')}</td>
                <td className='py-2 px-4 border-b border-gray-300'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100':job.status === 'Rejected'?'bg-red-100':'bg-yellow-100'} px-4 py-1.5 rounded`}>{job.status}</span>
                </td>
              </tr>
            ):(null))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default Applications