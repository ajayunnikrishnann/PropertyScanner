import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useForgotPasswordMutation } from '../slices/usersApiSlice'
import { useNavigate } from 'react-router-dom'
import LoaderComponent from '../components/loader'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [verifyEmail,{isLoading}] = useForgotPasswordMutation()
    
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if(!email){
                toast.error(' email is required')
            }else{
               
                sessionStorage.setItem('forgotPasswordEmail',email)
                const responseFromApiCall = await verifyEmail({ email }).unwrap()
                if(responseFromApiCall.success){
                    navigate('/verifyotp')
                }
            }
        } catch (err) {
            if (err.data && err.data.message) {
                toast.error(err.data.message)
              } else {
                toast.error('An error occurred. Please try again.')
              }
        }
    }
  return (
    <div className="bg-cover bg-center bg-opacity-50 h-screen pt-20" style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
    <div  className='flex items-center justify-center p-8 pt-28'  >
      <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
        <h1
         className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
           style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}
         >
           Forgot Password
         </h1>
      
         <input
           type='text'
           placeholder='Enter Your Registered Email'
           id='email'
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full '
         />
      
         <button
          onClick={submitHandler}
          disabled={isLoading}
           className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70'
         >
          {isLoading ? (
            <LoaderComponent buttonText="Proceeding..."/>
          ) : (
         'Proceed'
          )}
         </button>

         <div className='flex flex-col items-center gap-2 mt-1 justify-center'>
        
           <p>Remember now?</p>
           <Link to="/auth">
           <span className='text-cyan-950 text-stroke' style={{ WebkitTextStroke: '1px ', textStroke: '1px ' }}>
             Sign In
           </span>
           </Link>
            
         </div>
       
       </form>
     </div>
  </div>
  )
}

export default ForgotPassword