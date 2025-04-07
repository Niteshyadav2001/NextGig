import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import { setSearchFilter } from '../slices/AppSlice';
import JobCard from './JobCard';

function JobListing() {
  const searchedData = useSelector((store) => store.app)
  const { isSearched, title, location } = searchedData;
  const dispatch = useDispatch()
  const jobs = useSelector((store) => store.jobs.jobs) || [];
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [filteredJobs, setFilteredJobs] = useState(jobs)

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const handleLocationChange = (location) => {
    setSelectedLocations(
      prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
    )
  }

  useEffect(() => {
    const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
    const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
    const matchesTitle = job => searchedData.title === null || job.title.toLowerCase().includes(searchedData.title?.toLowerCase())
    const matchesSearchLocation = job => searchedData.location === null || job.location.toLowerCase().includes(searchedData.location?.toLowerCase())

    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
    )

    setFilteredJobs(newFilteredJobs)
    setCurrentPage(1)
  }, [jobs, selectedCategories, selectedLocations, searchedData, title])


  return (
    <div className='container px-20 py-10 flex flex-row'>
      {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* import search data from hero component  */}
        {
          ((title || location))
            ?
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div className='flex items-center gap-3 mb-7'>
                {
                  title && (
                    <span className='flex gap-2 items-center border-2 p-2 border-blue-100 bg-blue-50'>
                      {title}
                      <img
                        onClick={() => dispatch(setSearchFilter({ title: "" }))}
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
                        onClick={() => dispatch(setSearchFilter({ location: "" }))}
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
              JobCategories.map((category, index) => (
                <li key={index} className='flex items-center cursor-pointer'>
                  <input
                    id={`category-${index}`}
                    className='scale-125 mr-2'
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={`category-${index}`} className='cursor-pointer flex-grow'>
                    {category}
                  </label>
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
              JobLocations.map((Location, index) => (
                <li key={index}className='flex items-center cursor-pointer'>
                  <input
                    id={`Location-${index}`}
                    className='scale-125 mr-2'
                    type="checkbox"
                    onChange={() => handleLocationChange(Location)}
                  />
                  <label htmlFor={`Location-${index}`} className='cursor-pointer flex-grow'>
                    {Location}
                  </label>
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
          {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>


        {/* we will do our pagination here  */}
        {
          filteredJobs.length > 0 && (
            <div className='flex items-center justify-center space-x-2 mt-10'>
              <a href="#job-list">
                <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="left_arrow_icon" />
              </a>

              {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                <a href="#job-list" key={index}>
                  <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                </a>
              ))}

              <a href="#job-list">
                <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="right_arrow_icon" />
              </a>
            </div>
          )
        }
      </section>
    </div>
  )
}

export default JobListing

