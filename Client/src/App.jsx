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

function App() {

  const {isRecruiterLogin} = useSelector((store) => store.recuiter)

  return (
    <div>
      { isRecruiterLogin && <RecruiterLogin /> }
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/apply-jobs/:id" element={<ApplyJob/>} />
        <Route path="/applications" element={<Applications/>} />
        <Route path="/dashboard" element={<Dashboard/>} >
          <Route path="add-job" element={<AddJob/>} />
          <Route path="manage-jobs" element={<ManageJobs/>} />
          <Route path="view-applications" element={<ViewApplications/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
