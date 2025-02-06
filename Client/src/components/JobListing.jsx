import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets';
import { setSearchFilter } from '../slices/AppSlice';
import JobCard from './JobCard';

function JobListing() {
  
  
  const searchedData = useSelector((store) => store.app)
  const {isSearched, title, location} = searchedData;
  const dispatch = useDispatch()
  


  return (
    <div className='container px-20 py-10 flex flex-row'>
      {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* import search data from hero component  */}
        {
          (isSearched && (title || location))
          ?
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
            <div className='flex items-center gap-3 mb-7'>
              {
                title && (
                  <span className='flex gap-2 items-center border-2 p-2 border-blue-100 bg-blue-50'>
                    {title}
                    <img
                      onClick={() => dispatch(setSearchFilter({title: ""}))}
                      className='cursor-pointer' 
                      src={assets.cross_icon} 
                      alt="" 
                    />
                  </span>
                )
              }
              {
                location && (
                  <span className='flex gap-2 items-center border-2 p-2 border-red-100 bg-red-50'>
                    {location}
                    <img
                      onClick={() => dispatch(setSearchFilter({location: ""}))} 
                      className='cursor-pointer' 
                      src={assets.cross_icon} 
                      alt="" 
                    />
                  </span>
                )
              }
            </div>
          </>
          :
          <></>
        }

        {/* category */}
        <div className='mb-5'>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='text-gray-600 space-y-4'>
            {
              JobCategories.map((category,index) => (
                <li key={index}>
                  <input className='scale-125 mr-2' type="checkbox" name="" id="" />
                  {category}
                </li>
              ))
            }
          </ul>
        </div>

        {/* location  */}
        <div className='mb-5'> 
          <h4 className='font-medium text-lg py-4 pt-10'>Search by Location</h4>
          <ul className='text-gray-600 space-y-4'>
            {
              JobLocations.map((Location,index) => (
                <li key={index}>
                  <input className='scale-125 mr-2' type="checkbox" name="" id="" />
                  {Location}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* job listings */}
      <section className='w-full text-gray-800'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>Latest Jobs</h3>
        <p className='text-gray-600 mb-8 text-md'>Get your desired job from top companies.</p>
        <div className='grid grid-cols-1 sm:grid:cols-2 xl:grid-cols-3 gap-5 '>
            {jobsData.map((job,index)=>(
              <JobCard key={index} job={job} />
            ))}
        </div>
        </section>
    </div>
  )
}

export default JobListing

