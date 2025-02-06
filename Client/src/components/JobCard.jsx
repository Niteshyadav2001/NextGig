import React from 'react'
import { assets } from '../assets/assets'

function JobCard({job}) {
  return (
    <div className='border-2 border-gray-300 rounded-md p-5 w-'>
      <div>
        <img className='h-8' src={assets.company_icon} alt="" />
      </div>
      <h4 className='font-medium text-2xl mt-3 '>{job.title}</h4>
      <div className='pt-5 flex gap-5'>
        <span className='border border-blue-200 bg-blue-50 px-3 py-2 rounded'>{job.location}</span>
        <span className='border border-red-200 bg-red-50 px-3 py-2 rounded'>{job.level}</span>
      </div>
      <p className='pt-5 text-gray-600 ' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className='flex items-center gap-3 mt-5'>
        <button className='cursor-pointer bg-blue-500 text-white py-2 px-3 rounded-md font-medium'>Apply Now</button>
        <button className='cursor-pointer text-gray-600 border py-2 px-3 rounded-md font-medium'>Learn More</button>
      </div>
    </div>
  )
}

export default JobCard