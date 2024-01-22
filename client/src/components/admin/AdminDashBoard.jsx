
import React from 'react'
import Chart  from './Chart'


function AdminDashBoard() {
  return (
    
  <div className='flex flex-col  space-y-6 py-12 px-14'>
    <div className='flex space-x-8 w-4/5 flex-col'>
        <h1>Monthly Income</h1>
        <Chart />
        
    </div>
   
        
    
  </div>
  )
}

export default AdminDashBoard
