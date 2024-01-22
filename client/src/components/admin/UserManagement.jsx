import React from 'react'
import UsersTable from '../../components/admin/UserTable'

function UserManagement() {
  return (
    <>
 <div className="header-margin ">
 

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
            <UsersTable />
          </div>
        </div>
        
      </div>
    </div>
  </div>
  </div>
</>

  )
}

export default UserManagement