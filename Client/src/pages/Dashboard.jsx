import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanyData, setCompanyToken } from '../slices/CompanySlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch  = useDispatch()

  const { companyData} = useSelector((store) => store.company)
  // console.log(companyData)



  // Function to logout for company
  const logout = () => {
    dispatch(setCompanyData(null))
    dispatch(setCompanyToken(null))
    navigate('/')
  }

  // As soon as the dashboard is open, manage jobs page is openend.
  useEffect(() => {
    if(companyData)
      navigate('/dashboard/manage-jobs')
  },[companyData])

  return (
    <div className='min-h-screen'>
      {/* Navbar for Recruiter Panel  */}
      <div className='shadow py-4'>
        <div className='px-5 justify-between items-center flex'>
          <img onClick={e => navigate('/' )} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
          { companyData && (
            <div className='flex items-center gap-3'>
              <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
              <div className='relative group'>
                <img className='w-10 rounded-full outline-none' src={companyData.image} alt="" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                  <ul className='list-none m-0 bg-gray-300 rounded-md border text-sm'>
                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>


      <div className='flex items-start'>
        {/* left side of section with add job, manage job and view applications. */}
        <div className='inline-block min-h-screen border-r-2 pt-5'>
          <ul className='flex flex-col items-start text-gray-800'>
            <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/dashboard/add-job'}>
              <img src={assets.add_icon} alt="" />
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/dashboard/manage-jobs'}>
              <img src={assets.home_icon} alt="" />
              <p className='max-sm:hidden'>Manage Jobs</p>
            </NavLink>

            <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/dashboard/view-applications'}>
              <img src={assets.person_tick_icon} alt="" />
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>


        <div className='flex-1 h-full p-2 sm:p-5'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard