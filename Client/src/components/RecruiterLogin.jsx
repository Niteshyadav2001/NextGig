import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setRecruiterLogin } from "../slices/LoginSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { selectBackendApi } from "../slices/BackendAPI";
import { setCompanyData, setCompanyToken } from "../slices/CompanySlice";
import { toast } from "react-toastify";

function RecruiterLogin() {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const backendAPI = useSelector(selectBackendApi)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Signup" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if(state === "Login"){
        const {data} = await axios.post(backendAPI + '/api/company/login', {email, password})

        if(data.success){
          dispatch(setCompanyToken({companyToken: data.token}))
          dispatch(setCompanyData({companyData: data.company}))
          dispatch(setRecruiterLogin(false))
          navigate('/dashboard')
        }
        else{
          toast.error(data.message)
        }
      } else {
        const formData = new FormData()
        formData.append('name',name)
        formData.append('password',password)
        formData.append('email',email)
        formData.append('image',image)

        const { data } = await axios.post(backendAPI+'/api/company/register',formData)

        // console.log(data.success)
      
        if(data.success){
          dispatch(setCompanyToken({companyToken: data.token}))
          dispatch(setCompanyData({companyData: data.company}))
          localStorage.setItem('companyToken', data.token)
          dispatch(setRecruiterLogin({isRecruiterLogin: false}))
          navigate('/dashboard')
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error)
    }

  };


  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () =>{
      document.body.style.overflow = 'unset'
    }
  },[])

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm mt-2">Welcome back! Please sign in to continue</p>

        {state === "Signup" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 rounded-full"
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> Logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-2 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full cursor-pointer text-white py-2 rounded-full mt-5"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="text-sm text-center mt-3">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => setState("Signup")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer underline"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img className="absolute top-5 right-5 cursor-pointer" onClick={() => dispatch(setRecruiterLogin(false))} src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
}

export default RecruiterLogin;
