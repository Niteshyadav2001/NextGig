import React from "react";
import { assets } from "../assets/assets";
import { FcLock } from "react-icons/fc";

function ChangePassword() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center px-3 border-1 border-black/30 rounded-md">
          <img src={assets.lock_icon} alt="" />
          <input
            className="outline-none px-4 py-2"
            type="text"
            placeholder="Current Password"
          />
        </div>
        <div className="flex items-center px-2 border-1 border-black/30 rounded-md">
          <FcLock />
          <input
            className="outline-none px-4 py-2"
            type="text"
            placeholder="New Password"
          />
        </div>
        <div className="flex items-center px-2 border-1 border-black/30 rounded-md">
          <FcLock />
          <input
            className="outline-none px-4 py-2"
            type="text"
            placeholder="Confirm New Password"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-7">
        <button className="border-green-400 px-4 py-2 rounded-lg border-2 cursor-pointer hover:border-none hover:bg-green-500 hover:text-white">Update Password</button>
      </div>
    </div>
  );
}

export default ChangePassword;
