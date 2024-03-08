import { useState } from "react";
import { useBlockUserByAdminMutation,useUnblockUserByAdminMutation } from "../../slices/adminApiSlice";
import PropTypes from 'prop-types'
import { toast } from "react-toastify";
import { FaSearch } from 'react-icons/fa'
import { Dialog } from '@headlessui/react'
import ReactPaginate from "react-paginate";

const UsersTable = ({users, setUsersData}) => {
      UsersTable.propTypes = {
        users: PropTypes.array.isRequired
      };
  // let [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [userIdToBlock, setUserIdToBlock] = useState(null); 
  const [userIdToUnblock, setUserIdToUnblock] = useState(null); 
  const [currentPage, setCurrentPage] = useState(0);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  
    const [blockUserByAdmin,{ isLoading: isBlocking }] = useBlockUserByAdminMutation()
    const [unblockUserByAdmin,{ isLoading: isUnblocking }] = useUnblockUserByAdminMutation()

    // const [activeTab, setActiveTab] = useState(0);

    // const handleTabClick = (index) => {
    //     setActiveTab(index);
    // }

    // const tabItems = [
    //     "All Users",
    //     "Blocked Users",
    // ]

    // const {data,isLoading,refetch,isError} = useGetUsersQuery()

    const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = filteredUsers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

    const handleBlock = async () => {
      try {      
        await blockUserByAdmin({ userId: userIdToBlock });
        toast.success("User Blocked Successfully.");
        setUserIdToBlock(null);
        setShowConfirmation(false); 
        setUsersData(prevUsers => {
          return prevUsers.map(user =>
            user._id === userIdToBlock ? { ...user, isBlocked: true } : user
          );
        });
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    };

    const handleUnblock = async () => {
      try {      
        await unblockUserByAdmin({ userId: userIdToUnblock });
        toast.success("User Un Blocked Successfully.");
        setUserIdToUnblock(null); 
        setShowConfirmation(false); 
  
        setUsersData(prevUsers => {
          return prevUsers.map(user =>
            user._id === userIdToUnblock ? { ...user, isBlocked: false } : user
          );
        });
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    };
      // const [currentPage, setCurrentPage] = useState(1);
      // const handlePageClick = (pageNumber) => {
      //   setCurrentPage(pageNumber);
      // }

      // const itemsPerPage = 5;
      // const startIndex = (currentPage -1) * itemsPerPage;
      // const endIndex = startIndex + itemsPerPage

      // if(isLoading){
      //   return(
      //       <h1>Loading...</h1>
      //   )
      // }

      // let length = data.length 

      // if(activeTab===1){
      //   length = data.filter((item)=> item.isBlocked===true).length 
      // }
      return (

 <>
 <div className='pl-80'>
    <form className='bg-slate-200   rounded-lg pr-4   flex items-center'>
        
          <input
            type='text'
            placeholder="Enter Name,Email or Mobile.."
            className='bg-transparent focus:outline-none w-1 sm:w-36 h-6 pl-2   placeholder:text-black border-none focus:border-none focus:ring-0'
            value={searchQuery}
            onChange={handleSearch}
         />
          <button className="pl-96">
            <FaSearch className='text-black ' />
          </button>
        </form>
        </div>
 


<div className="pt-6">
 <div className="overflow-x-auto">
  <table className="mt-3 mb-3 w-full border-collapse">
  <thead>
    <tr className="bg-gray-200">
      <th className="py-2 px-4 border">SI No.</th>
      <th className="py-2 px-4 border">Name</th>
      <th className="py-2 px-4 border">Email</th>
      <th className="py-2 px-4 border">Phone</th>
      <th className="py-2 px-4 border">Status</th>
      <th className="py-2 px-4 border">Manage</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user, index) => (
      <tr key={index} className="border">
        <td className="py-2 px-4 border">{index + 1}</td>
        <td className="py-2 px-4 border">{user.username}</td>
        <td className="py-2 px-4 border">{user.email}</td>
        <td className="py-2 px-4 border">{user.mobile}</td>
        <td className="py-2 px-4 border">
          {user.isBlocked === false ? (
            <span className="text-green-500 font-bold">Active</span>
          ) : (
            <span className="text-red-500 font-bold">Blocked</span>
          )}
        </td>
        <td className="py-2 px-4 border">
          {user.isBlocked === false ? (
            <button
              type="button"
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={() => {
                setUserIdToBlock(user._id);
                setShowConfirmation(true);
              }}
            >
              Block
            </button>
          ) : (
            <button
              type="button"
              className="bg-green-500 text-white py-1 px-2 rounded"
              onClick={() => {
                setUserIdToUnblock(user._id);
                setShowConfirmation(true);
              }}
            >
              Unblock
            </button>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

<Dialog onClose={() => setIsOpen(false)}  open={showConfirmation} onHide={() => setShowConfirmation(false)} className="modal">
<Dialog.Panel>
 
<Dialog.Title>Confirmation</Dialog.Title>
      
      <button type="button" className="close" onClick={() => setShowConfirmation(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    
    <div className="modal-body">
      {userIdToBlock ? (
        <>
          <p className="mb-4">Are you sure you want to actually block this user?</p>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleBlock}
            disabled={isBlocking}
          >
            {isBlocking ? "Blocking..." : "Block"}
          </button>
        </>
      ) : userIdToUnblock ? (
        <>
          <p className="mb-4">Are you sure you want to unblock this user?</p>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleUnblock}
            disabled={isUnblocking}
          >
            {isUnblocking ? "Unblocking..." : "Unblock"}
          </button>
        </>
      ) : null}
    </div>
  

  </Dialog.Panel>
</Dialog>

      </div>
    <ReactPaginate
  previousLabel={"previous"}
  nextLabel={"next"}
  breakLabel={"..."}
  breakClassName={"break-me"}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageClick}
  containerClassName={"pagination flex justify-center mt-4"}
  previousLinkClassName={"bg-blue-500 text-white py-2 px-4 rounded-l"}
  nextLinkClassName={"bg-blue-500 text-white py-2 px-4 rounded-r"}
  pageClassName={"mx-2"}
  activeClassName={"active"}
/>
    </div>


  

</>

      )
}
export default UsersTable;