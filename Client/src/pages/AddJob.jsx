import React, { useEffect, useRef, useState } from "react";
import Quill from 'quill'
import { JobCategories, JobLocations } from "../assets/assets";
import axios from 'axios';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCompanyAuth from "../../hooks/useCompanyAuth";

function AddJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  // useCompanyAuth()

  const backendAPI = useSelector((store)=> store.backendAPI.API)
  const { companyToken } = useSelector((store)=> store.company) 
  // console.log(companyToken);
  // console.log(backendAPI)
  
  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      // console.log(description);
      
      const { data } = await axios.post(
        backendAPI + "/api/company/post-job",
        { title, description, location, category, level,salary },
        {
          headers: { token: companyToken },
          withCredentials: true, // Moved inside the config object
          
        }
      );
      


      if(data.success){
        toast.success(data.message)
        // setTitle('')
        // setSalary(0)
        // quillRef.current.root.innerHTML = ""
        console.log("data sucessfully sent to database.")
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    // initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current,{
        theme: 'snow',
      })
    }

  },[])

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3" >
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded" onChange={e => setTitle(e.target.value)} type="text" placeholder="Type here" required />
        </div>

        <div className="w-full max-w:lg">
          <p className="my-2">Job Description</p>
          <div ref={editorRef}>

          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Job Category</p>
            <select className="w-full px-4 py-2 border-2 border-gray-300 rounded" onChange={e => setCategory(e.target.value)} name="" id="">
              {JobCategories.map((category,index) =>(
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Location</p>
            <select className="w-full px-4 py-2 border-2 border-gray-300 rounded" onChange={e => setLocation(e.target.value)} name="" id="">
              {JobLocations.map((location,index) =>(
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2">Job Level</p>
            <select className="w-full px-4 py-2 border-2 border-gray-300 rounded" onChange={e => setLevel(e.target.value)} name="" id="">
              <option value="Begineer level">Begineer level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>

          <div>
            <p className="mb-2">Job Salary</p>
            <input className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]" onChange={e => setSalary(e.target.value)} type="Number" placeholder="2500" min={0} />
          </div>

          <button className="w-28 py-3 mt-2 bg-black text-white rounded">ADD</button>
      </form>
    </div>
  );
}

export default AddJob;
