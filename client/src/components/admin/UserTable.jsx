import { useState } from "react";
import { useGetUsersQuery } from "../../slices/adminApiSlice";
import Pagination from "../Pagination";
import { useBlockUserMutation, useUnBlockUserMutation } from "../../slices/adminApiSlice";


    const UsersTable = () => {
    const [blockUser] = useBlockUserMutation()
    const [unBlockUser] = useUnBlockUserMutation()

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    }

    const tabItems = [
        "All Users",
        "Blocked Users",
    ]

    const {data,isLoading,refetch,isError} = useGetUsersQuery()

    const handleBlock = async(id) =>{
        const res = await blockUser({id:id})
        refetch()
    }

    const handleUnblock = async(id) =>{
        try {
        const res = await unBlockUser({ id: id })
        console.log("Unblock response:", res);
        refetch()
      } catch(error){
        console.error("Error unblocking user:", error);
      }
    }
      const [currentPage, setCurrentPage] = useState(1);
      const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
      }

      const itemsPerPage = 5;
      const startIndex = (currentPage -1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage

      if(isLoading){
        return(
            <h1>Loading...</h1>
        )
      }

      let length = data.length 

      if(activeTab===1){
        length = data.filter((item)=> item.isBlocked===true).length 
      }
      return (

 <>
  <div className="tabs border-b-2 border-blue-500">
    <div className="flex gap-x-4 gap-y-2 justify-between">
      {tabItems.map((item, index) => (
        <div className="flex-shrink-0" key={index}>
          <button
            className={`text-lg lg:text-base text-gray-700 font-semibold pb-2 lg:pb-0 focus:outline-none ${activeTab === index ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {item}
          </button>
        </div>
      ))}
    </div>

    <div className="pt-6">
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 0 && data.slice(startIndex, endIndex).map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.mobile}</td>
                <td className="px-4 py-2">{item.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className="px-4 py-2">
                  {item.isBlocked === true? (
                    <button className="rounded-full py-2 px-4 text-center text-sm font-semibold bg-blue-500 text-white" onClick={() => handleUnblock(item._id)}>
                      UnBlock
                    </button>
                  ) : (
                    <button className="rounded-full py-2 px-4 text-center text-sm font-semibold bg-blue-500 text-white" onClick={() => handleBlock(item._id)}>
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {activeTab === 1 && data.filter((item) => item.isBlocked === true).slice(startIndex, endIndex).map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.mobile}</td>
                <td className="px-4 py-2">{item.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className="px-4 py-2">
                  {item.isBlocked ? (
                    <button className="rounded-full py-2 px-4 text-center text-sm font-semibold bg-blue-500 text-white" onClick={() => handleUnblock(item._id)}>
                      UnBlock
                    </button>
                  ) : (
                    <button className="rounded-full py-2 px-4 text-center text-sm font-semibold bg-blue-500 text-white" onClick={() => handleBlock(item._id)}>
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Pagination
    currentPage={currentPage}
    handlePageClick={handlePageClick}
    totalPages={Math.ceil(length / itemsPerPage)}
    setCurrentPage={setCurrentPage}
  />
</>

      )
}
export default UsersTable;