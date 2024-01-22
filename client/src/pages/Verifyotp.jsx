import {React,useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useVerifyAndChangePasswordMutation } from '../slices/usersApiSlice'
import { Link,useNavigate } from 'react-router-dom'
import LoaderComponent from '../components/loader'

function    Verifyotp() {
    const [otp,setOtp] = useState('')
    const [verifyOtp,{isLoading}] = useVerifyAndChangePasswordMutation()
    const email = sessionStorage.getItem('forgotPasswordEmail')
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            if(!otp) {
                toast.error(' enter otp')
            }else{
                const responseFromApiCall = await verifyOtp({ otp, email })
                if(responseFromApiCall) {
                    navigate('/changePassword')
                }
            }
        } catch (error) {
            if (err.data && err.data.message) {
                toast.error(err.data.message)
              } else {
                toast.error('An error occurred. Please try again.')
              }
        }
    }

  return (
    <div className="bg-cover bg-center bg-opacity-50 h-screen" style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
    <div className='flex items-center justify-center p-16 pt-36'  >
    
    <div className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
  <h1  className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>Verify OTP </h1>
   <input type='text' placeholder='Enter your OTP' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-white w-full text-white' />
   <button 
   onClick={submitHandler}
   disabled={isLoading}
    className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >
      {isLoading ? (
            <LoaderComponent buttonText="Verifying..." />
          ) : (
          'Verify'
          )}
      </button>
   
   <div className="flex gap-2 mt-1 justify-center ">
     <p>An otp has sent to your email</p>
     </div>
   </div>


 </div>
  </div>
  )
}

export default Verifyotp