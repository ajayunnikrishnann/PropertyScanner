import React from 'react'
import UsersTable from '../../components/admin/UserTable'
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { useGetUsersMutation } from '../../slices/adminApiSlice';
import Loading from "../../components/Loading"


export const  UserManagement = () => {
  const [usersData, setUsersData] = useState([]);
  const [usersDataFromAPI, { isLoading } ] = useGetUsersMutation();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await usersDataFromAPI();
        if (responseFromApiCall.error) {
          // Handle error
          console.error("Error fetching users:", responseFromApiCall.error);
          toast.error("Error fetching users. Please try again.");
          return;
        }
  
        console.log("API Response:", responseFromApiCall);
  
        const usersArray = responseFromApiCall.data.usersData;
        setUsersData(usersArray);
      };
      fetchData();
    } catch (error) {
      toast.error(error);
      console.error("Error fetching users:", error);
    }
  }, [usersDataFromAPI]);

  return (
    <div>
 <div className="header-margin">
 

  <div className="dashboard flex">
    <div className="dashboard__sidebar bg-white overflow-y-auto scrollbar-w-2 scrollbar-track-gray-300 scrollbar-thumb-gray-500">
    </div>
    <div className="dashboard__main flex-1">
      <div className="dashboard__content bg-gray-200 p-8 md:p-10 lg:p-20">
        <div className="flex flex-col items-start pb-16 lg:pb-10 md:pb-8">
          <h1 className="text-5xl font-semibold" style={{ marginLeft: "40%" }}>
            Users
          </h1>
          <div className="py-8 px-8 rounded-lg bg-white shadow-md mt-4">
             { isLoading ? <Loading/> : <UsersTable users={usersData} setUsersData={setUsersData}/>}
          </div>
        </div>
        
      </div>
    </div>
  </div>
  </div>
</div>

  )
}

export default UserManagement