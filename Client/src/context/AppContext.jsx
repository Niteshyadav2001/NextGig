import { createContext, useContext, useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const backendAPI = useSelector((store) => store.backendAPI.API)


  useEffect(() => {
    if (user) {
      console.log("User is present")
      fetchUserData();
      fetchUserApplications();
    }
  }, [user]);
  


  const fetchUserData = async () => {
    try {
      const token = await getToken();
      console.log("new token is: "+token)
      const { data } = await axios.get(backendAPI+"/api/users/user", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if(data.success){
        toast.success(data.message)
        setUserData(data.user);
        console.log(data.user)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserApplications = async () => {
    // try {
    //   const token = await user.getToken();
    //   const res = await axios.get("/api/applications", {
    //     headers: { Authorization: `Bearer ${token}` }
    //   });
    //   setUserApplications(res.data);
    // } catch (error) {
    //   console.error("Error fetching user applications:", error);
    // }
  };

  return (
    <AppContext.Provider value={{ userData, userApplications, fetchUserData, fetchUserApplications }}>
      {children}
    </AppContext.Provider>
  );

}


export const useAppContext = () => useContext(AppContext);