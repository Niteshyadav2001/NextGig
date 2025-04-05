import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ApplyJob from "./pages/ApplyJob"
import Applications from "./pages/Applications"
import RecruiterLogin from "./components/RecruiterLogin"
import { useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard"
import AddJob from "./pages/AddJob"
import ManageJobs from "./pages/ManageJobs"
import ViewApplications from "./pages/ViewApplications"
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
import useFetchJobs from "../hooks/useFetchJobs"
import UserLogin from "./components/UserLogin"
import { useFetchAppliedJobs } from "../hooks/useFetchAppliedJobs"
import UserDashboard from "./components/UserDashboard"
import ChangePassword from "./components/ChangePassword"
import UpdateResume from "./components/UpdateResume"
import DeleteAccount from "./components/DeleteAccount"
import UserInfo from "./components/UserInfo"

function App() {

  const {isRecruiterLogin, isUserLogin} = useSelector((store) => store.login)
  const {companyToken} = useSelector((store) => store.company)

  // calling useFetch Jobs
  useFetchJobs()

  // calling user applied jobs only when user is login
  // if(!isUserLogin){ 
    useFetchAppliedJobs()
  // }


  return (
    <div>
      { isRecruiterLogin && <RecruiterLogin /> }
      { isUserLogin && <UserLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/userDashboard" element={<UserDashboard/>} /> */}
        <Route path="/apply-jobs/:id" element={<ApplyJob/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/dashboard" element={<Dashboard/>} >

        <Route path="change-password" element={<ChangePassword />} />
        <Route path="update-resume" element={<UpdateResume />} />
        <Route path="delete-account" element={<DeleteAccount />} />
        <Route path="user-profile" element={<UserInfo />} />
        {
        companyToken ? <>
          <Route path="add-job" element={<AddJob/>} />
          <Route path="manage-jobs" element={<ManageJobs/>} />
          <Route path="view-applications" element={<ViewApplications/>} />
          </> : null
        }
        </Route>
      </Routes>
    </div>
  )
}

export default App
