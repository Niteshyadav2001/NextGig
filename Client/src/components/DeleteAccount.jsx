import React from 'react'
import { assets } from '../assets/assets'

function DeleteAccount() {
  return (
    <div>
      <div className='flex flex-col gap-3'>
        <label htmlFor="">Are you sure you want to delete this account?</label>
        <div className="flex items-center border-1 border-black/30 rounded-md pl-2">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none px-2 py-2"
            type="text"
            placeholder="New Password"
          />
        </div>
        <div className="flex items-center border-1 border-black/30 rounded-md pl-2">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none px-2 py-2"
            type="text"
            placeholder="Confirm New Password"
          />
        </div>
      </div>
      <div className='flex items-center justify-center mt-10'>
        <button className='border-red-300 border-2 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 hover:text-white hover:border-none'>Delete Account</button>
      </div>
    </div>
  )
}

export default DeleteAccount