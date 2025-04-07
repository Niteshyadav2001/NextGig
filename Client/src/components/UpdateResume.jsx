import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setIsUserDashboardOpen, setUserData } from "../slices/UserSlice";

function UpdateResume() {
  const dispatch = useDispatch();
  const [resume,setResume] = useState(null)
  const backendAPI = useSelector((store) => store.backendAPI.API)
  const { userToken, userData } = useSelector((store) => store.user)

  const handleUpdate = async() => {
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      const { data } = await axios.post(backendAPI+"/api/users/update-resume",
        formData,
        {headers: {token: userToken}},
      )

      if(data.success){
        toast.success(data.message)
        dispatch(setIsUserDashboardOpen(false))
        dispatch(setUserData(data.user))
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-8 mb-6 mt-5">
      <div className="flex items-center gap-2 justify-center">
        <label className="flex items-center cursor-pointer" htmlFor="resumeUpload">
          <p className="bg-blue-100 text-blue-600 rounded-lg px-4 py-2 mr-2 cursor-pointer">
            {resume ? resume.name : "Select Resume"}
          </p>
          <input
            id="resumeUpload"
            onChange={(e) => setResume(e.target.files[0])}
            accept="application/pdf"
            type="file"
            hidden
          />
          <img src={assets.profile_upload_icon} alt="" />
        </label>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleUpdate}
          className="border border-green-400 rounded-lg px-4 py-2 hover:border-none hover:bg-green-400 hover:text-white cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateResume;
