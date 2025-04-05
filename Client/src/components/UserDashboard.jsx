// import React, { useEffect, useRef, useState } from "react";
// import { assets } from "../assets/assets";
// import { MdOutlineModeEdit } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { LuCircleUserRound } from "react-icons/lu";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import UserInfo from "./UserInfo";
// import UpdateResume from "./UpdateResume";
// import ChangePassword from "./ChangePassword";
// import DeleteAccount from "./DeleteAccount";

// // import { useDispatch, useSelector } from "react-redux";
// // import { setRecruiterLogin } from "../slices/LoginSlice";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { selectBackendApi } from "../slices/BackendAPI";
// // import { setCompanyData, setCompanyToken } from "../slices/CompanySlice";

// function RecruiterLogin() {
//   // const [state, setState] = useState("Login");
//   const [name, setName] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [deletePassword, setDeletePassword] = useState("");
//   const [resume, setResume] = useState(null);
//   const [image, setImage] = useState(false);
//   const [changeName, setChangeName] = useState(false);

//   const fullName = useRef();

//   useEffect(() => {
//     fullName.current.value = "UserName";
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   return (
//     <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
//       <div className="relative bg-white/80 p-5 rounded-xl">
//         <div>
//           <div className="flex gap-10 px-8 py-5">
//             <div className="relative group w-32 h-32 cursor-pointer">
//               <img
//                 className="w-full h-full object-cover rounded-md"
//                 src={assets.upload_area}
//                 alt="Profile"
//               />
//               <div className="absolute inset-0 bg-black/50 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center rounded-full transition-opacity duration-300">
//                 <p className="text-white text-sm font-medium">Update Profile</p>
//               </div>
//             </div>

//             <div className="flex flex-col justify-center gap-3 ml-6">
//               <div className="flex rounded-md">
//                 <input className="w-40 border-none outline-none bg-transparent" type="text" ref={fullName} />
//                 <MdOutlineModeEdit className="w-5 h-5 mt-1 " />
//               </div>
//               <label htmlFor="">Email id: user@gmail.com</label>
//             </div>
//           </div>

//           {/* for below part div  */}

//           <div className="flex my-5">
//             {/* for side bar  */}
//             <div className="">
//               <ul className='flex flex-col items-start text-gray-800'>
//                 <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/change-password'}>
//                   <img className="w-5 h-5" src={assets.lock_icon} alt="" />
//                   <p>Change Password</p>
//                 </NavLink>

//                 <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/update-resume'}>
//                   <img className="w-5 h-5" src={assets.resume_selected} alt="" />
//                   <p>Update Resume</p>
//                 </NavLink>

//                 <NavLink className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/delete-account'}>
//                   <MdDelete className="w-5 h-5" />
//                   <p>Delete Account</p>
//                 </NavLink>

//                 <NavLink className={({isActive}) => `mt-30 flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-200 ${isActive && 'bg-blue-100 r-4 border-blue-500 border-r-3'}`} to={'/user-profile'}>
//                   <LuCircleUserRound className="w-5 h-5" />                 
//                   <p>User Profile</p>
//                 </NavLink>
//               </ul>
//             </div>

//             {/* outlet menu  */}
//             <div className="flex-1 h-full p-2 sm:p-5">
//               {/* This is outlet */}
//               <Outlet /> 
//               {/* <UserInfo /> */}
//               {/* <UpdateResume /> */}
//               {/* <ChangePassword /> */}
//               {/* <DeleteAccount /> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecruiterLogin;




import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";
import UserInfo from "./UserInfo";
import UpdateResume from "./UpdateResume";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import { setIsUserDashboardOpen } from "../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function RecruiterLogin() {
  const [activePage, setActivePage] = useState("userProfile"); // Default active page
  const fullName = useRef();
  const dispatch = useDispatch()
  const { userData } = useSelector((store) => store.user)

  useEffect(() => {
    fullName.current.value = userData.name;
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Function to conditionally render the content based on activePage
  const renderContent = () => {
    switch (activePage) {
      case "changePassword":
        return <ChangePassword />;
      case "updateResume":
        return <UpdateResume />;
      case "deleteAccount":
        return <DeleteAccount />;
      case "userProfile":
      default:
        return <UserInfo />;
    }
  };

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <div className="relative bg-white p-5 rounded-xl w-[50vw]">
        <div>
          {/* Header/Profile Section */}
          <div className="flex gap-10 px-8 py-5 border-b-2 border-dotted">
            <div className="relative group w-32 h-32 cursor-pointer">
              <img
                className="w-full h-full object-cover rounded-full"
                src={userData ? userData.image : assets.upload_area}
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/50 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center rounded-full transition-opacity duration-300">
                <p className="text-white text-sm font-medium">Update Profile</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 ml-6">
              <div className="flex rounded-md">
                <input
                  className="w-40 border-none outline-none bg-transparent"
                  type="text"
                  ref={fullName}
                />
                <MdOutlineModeEdit className="w-5 h-5 mt-1" />
              </div>
              <label>{`Email Id: ${userData.email}`}</label>
            </div>
          </div>

          {/* Main Content: Sidebar and Outlet */}
          <div className="flex my-5">
            {/* Sidebar */}
            <div className="border-r-2 border-dotted pr-2">
              <ul className="flex flex-col items-start text-gray-800">
                <li
                  onClick={() => setActivePage("changePassword")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "changePassword" 
                    ?
                    "bg-blue-100 r-4 border-blue-500 border-r-3"
                    :
                    "border-transparent border-r-3"
                  }`}
                >
                  <img
                    className="w-5 h-5"
                    src={assets.lock_icon}
                    alt="Change Password"
                  />
                  <p>Change Password</p>
                </li>
                <li
                  onClick={() => setActivePage("updateResume")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "updateResume" 
                    ?
                    "bg-blue-100 r-4 border-blue-500 border-r-3"
                    :
                    "border-transparent border-r-3"
                  }`}
                >
                  <img
                    className="w-5 h-5"
                    src={assets.resume_selected}
                    alt="Update Resume"
                  />
                  <p>Update Resume</p>
                </li>
                <li
                  onClick={() => setActivePage("deleteAccount")}
                  className={`flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "deleteAccount" 
                    ?
                    "bg-blue-100 r-4 border-blue-500 border-r-3"
                    :
                    "border-transparent border-r-3"
                  }`}
                >
                  <MdDelete className="w-5 h-5" />
                  <p>Delete Account</p>
                </li>
                <li
                  onClick={() => setActivePage("userProfile")}
                  className={`mt-30 flex items-center p-3 sm:px-6 gap-2 w-full cursor-pointer hover:bg-gray-200 ${
                    activePage === "userProfile" 
                    ?
                    "bg-blue-100 r-4 border-blue-500 border-r-3"
                    :
                    "border-transparent border-r-3"
                  }`}
                >
                  <LuCircleUserRound className="w-5 h-5" />
                  <p>User Profile</p>
                </li>
              </ul>
            </div>

            {/* Outlet Area */}
            <div className="flex-1 h-full p-2 sm:p-5">
              {renderContent()}
            </div>
          </div>
        </div>
        <img onClick={() => dispatch(setIsUserDashboardOpen(false))} className="absolute top-5 right-5 w-4 h-4 cursor-pointer" src={assets.cross_icon} alt="" />
      </div>
    </div>
  );
}

export default RecruiterLogin;
