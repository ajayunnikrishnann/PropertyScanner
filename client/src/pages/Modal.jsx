import {React,useState} from 'react'
import Otp from './Otp'



function Modal({ visible,onClose }) {
    const [showOtp, setShowOtp] = useState(false)
    const handleClose =()=> setShowOtp(false)

    const handleOnClose =(e)=>{
       if(e.target.id==="container")
        onClose()
    }

    if(!visible) 
    return null


    

  return (
    <div id='container'  onClick={handleOnClose} className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
        
     <div  className="flex flex-col items-center justify-center  bg-cover bg-center bg-opacity-50 pt-12" >
      
      <form className='flex flex-col gap-3  border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-white '>
      <h1 className='text-3xl  text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800  inline-block text-transparent bg-clip-text  font-extrabold    text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>SignUp</h1>
        <input type='text' placeholder='Username' id='username'  className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-cyan-950 w-full ' />
        <input type='text' placeholder='Email' id='email'   className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full ' />
        <input type='text' placeholder='Mobile number' id='mobile'   className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full ' />
        <input type='text' placeholder='Password' id='password'  className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full ' />
        <input type='text' placeholder='Confirm password' id='confirmPassword'  className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full '/>
      <button onClick={(e) => { e.preventDefault(); setShowOtp(true); }} className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >Sign Up</button>
      <Otp onClose={handleClose} visible={showOtp} />
      <div className="flex gap-2 mt-1 justify-center ">
        <p>Have an account?</p>
        
        <span className="text-cyan-950 text-stroke" style={{WebkitTextStroke: "1px ",textStroke: "1px "}}>Sign In</span>
    
      </div>
      </form>
      </div>
     
    </div>
  )
}

export default Modal