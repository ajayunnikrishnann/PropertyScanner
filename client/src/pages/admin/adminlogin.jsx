import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminloginMutation } from '../../slices/adminApiSlice'
import { setCredentials } from '../../slices/adminAuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const loginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Adminlogin] = useAdminloginMutation()
    const { adminInfo } = useSelector((state) => state.adminAuth)
    console.log(adminInfo)
  
    const submitHandler = async (e) => {
      e.preventDefault()
  
      try {
        const responseFromApiCall = await Adminlogin({
          email,
          password,
        }).unwrap()
  
        dispatch(setCredentials({ ...responseFromApiCall }))
        navigate('/adminDashboard')
      } catch (err) {
        toast.error('please check your email and password')
      }
    }
  

    return (
        <div className="bg-cover bg-slate-400 bg-center bg-opacity-50 h-screen pt-14" >
        <div  className='flex items-center justify-center p-8 pt-16'  >
          <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
            <h1
             className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
               style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}
             >
               Admin SignIn
             </h1>
          
             <input
               type='text'
               placeholder='Email'
               id='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              
               className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white '
             />
          
             <input
               type='text'
               placeholder='Password'
               id='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
              
               className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white '
             />
           
    
             <button
              onClick={submitHandler}
               className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70'
             >
               Sign In
             </button>
    
             
           </form>
         </div>
      </div>
      )

 
}

export default loginScreen
