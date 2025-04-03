import React, { useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

function ManageJobs() {
  const navigate = useNavigate()
  const [jobs,setJobs] = useState(null)

  const backendAPI = useSelector((store)=> store.backendAPI.API)
  const { companyToken } = useSelector((store)=> store.company) 

  // function to fetch company job applicants data
  const fetchCompanyJobs = async() => {
    try {
      const { data } = await axios.get(backendAPI+"/api/company/list-job",
        {headers: { token: companyToken },}
      );

      if(data.success){
        setJobs(data.jobData.reverse());
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Function to add the visibility of job
  const changeJobVisibility = async(id) => {
    try {
      const { data } = await axios.post(backendAPI+"/api/company/change-visibility",
        { id },
        { headers: {token: companyToken}
      })

      if(data.success){
        toast.success(data.success)
        fetchCompanyJobs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(companyToken)
        fetchCompanyJobs()
  },[companyToken])

  return jobs ? jobs.length === 0 ? ( 
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-xl sm:text-2xl">No Jobs Available or Posted</p>
    </div> 
  ) : (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left max-sm:hidden">#</th>
              <th className="px-4 py-2 border-b text-left">Job Title</th>
              <th className="px-4 py-2 border-b text-left max-sm:hidden">Date</th>
              <th className="px-4 py-2 border-b text-left max-sm:hidden">Location</th>
              <th className="px-4 py-2 border-b text-center">Applicants</th>
              <th className="px-4 py-2 border-b text-center">Visible</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).format("ll")}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                <td className="py-2 px-4 border-b text-center">
                  <input onChange={() => changeJobVisibility(job._id)} className="scale-125" type="checkbox" checked={job.visible} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={() => navigate('/dashboard/add-job')} className="bg-black text-white px-4 py-2 rounded cursor-pointer">Add new job</button>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs;
