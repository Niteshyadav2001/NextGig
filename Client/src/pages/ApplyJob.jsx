import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from 'k-convert'
import moment from 'moment'
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import axios from 'axios';
import { toast } from "react-toastify";
import { useFetchAppliedJobs } from "../../hooks/useFetchAppliedJobs";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
  const jobs = useSelector((store) => store.jobs.jobs) || [];
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { userData, userApplications, userToken } = useSelector((store) => store.user)
  const { refetch }  = useFetchAppliedJobs()


  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendAPI+`/api/jobs/${id}`)
  
      if(data.success){
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const applyHandler = async() => {
    try {

      if(userData === null)
        return toast.error("Login to apply");

      if(!userData.resume) {
        navigate('/applications')
        return toast.error("Upload resume to apply"); 
      }

      const { data } = await axios.post(backendAPI+'/api/users/apply',
        {jobId: jobData._id},
        {headers: {token: userToken}}
      )

      if(data.success){
        toast.success(data.message)
        refetch()
      } else {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === jobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob()
  }, [id, jobs]);

  useEffect(() => {
    if(userApplications.length > 0 && jobData){
      checkAlreadyApplied()
    }
  },[jobData,userApplications,id])

  return jobData ? (
    <>
      <Navbar />

      <div className="container min-h-screen flex flex-col py-10 px-4 2xl:px-20">
        <div className="bg-white text-black rounded w-full">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border-1 border-sky-400 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img className="h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border-gray-200 border-1" src={jobData.companyId.image} alt="" />
              <div className="text-center md:text-left text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-medium">{jobData.title}</h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button onClick={applyHandler} className="bg-blue-600 p-2.5 px-10 text-white rounded-md">{ isAlreadyApplied ? "Already Applied" : "Apply Now"}</button>
              <p className="mt-1 text-gray-600">Posted {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div className="rich-text" dangerouslySetInnerHTML={{__html:jobData.description}}></div>
              <button onClick={applyHandler} className="bg-blue-600 p-2.5 px-10 text-white rounded-md mt-10">{ isAlreadyApplied ? "Already Applied" : "Apply Now"}</button> 
            </div>

            {/* right section more jobs  */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2>More jobs from {jobData.companyId.name}</h2>
              {jobs.filter(job => job._id !== jobData._id && jobData.companyId._id === job.companyId._id)
              .filter(job => {
                const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                return !appliedJobsIds.has(job._id)
              }).slice(0,3)
              .map((job,index) => <JobCard key={index} job={job} />)}
            </div>
          </div>
        </div>

      </div>
      <Footer />

    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob;
