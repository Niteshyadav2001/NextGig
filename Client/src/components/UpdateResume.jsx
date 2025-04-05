import React from "react";
import { assets } from "../assets/assets";


function UpdateResume() {
  return (
    <div className="flex flex-col gap-8 mb-6 mt-5">
      <div className="flex items-center gap-2 justify-center">
        <label className="flex items-center" htmlFor="resumeUpload">
          <p className="bg-blue-100 text-blue-600 rounded-lg px-4 py-2 mr-2">
            {"Select Resume"}
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
          className="border border-green-400 rounded-lg px-4 py-2 hover:border-none hover:bg-green-400 hover:text-white cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateResume;
