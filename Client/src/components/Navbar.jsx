import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setRecruiterLogin, setUserLogin } from '../slices/LoginSlice'

function Navbar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userToken, userData } = useSelector((store) => store.user)

  console.log(userToken)

  return (
    <div className='shadow-lg py-4'>
      <div className='container px-4 2xl:px-20 mx-auto justify-between flex items-center'>
        <img className='cursor-pointer' onClick={() => navigate('/')} src={assets.logo} alt="Company Logo" />

        {
          userToken
          ?
          <div className='flex juistify-center items-center gap-3'>
            <Link className='cursor-pointer' to={'/applications'}>Applied Jobs</Link>
            <p>|</p>
            <p>Hi, {userData.name}</p>
            <Link to='/'>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={userData.image}
                alt="User Profile"
              />
            </Link>
          </div>
          :
          <div className='flex gap-4 max-sm:text-xs'>
            <button
              onClick={() => dispatch(setRecruiterLogin(true))} 
              className='text-gray-600 cursor-pointer'>
              Recruiter Login
            </button>
            <button 
            onClick={() => dispatch(setUserLogin(true))}
            className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer'
            >
              Login
            </button>
          </div>

        }

      </div>
    </div>
  )
}

export default Navbar