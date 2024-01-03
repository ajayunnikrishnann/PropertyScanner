import React from 'react'

export default function Otp({visible,onClose}) {
    const handleClose =(e)=>{
        if(e.target.id === 'container')
        onClose()
    }
    if(!visible) 
    return null

  return (
    <div id='container' onClick={handleClose} className='fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center'>
    
    <div  className="flex flex-col items-center justify-center  bg-cover bg-center bg-opacity-50 pt-12" >
    <form className='flex flex-col gap-3  border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-white '>
      <h1 className='text-3xl  text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800  inline-block text-transparent bg-clip-text  font-extrabold    text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>Verify OTP </h1>
      <input type='text' placeholder='Enter your OTP' id='otp'  className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-cyan-950 w-full ' />
      <button className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >Verify</button>
      <div className="flex gap-2 mt-1 justify-center ">
        <p>An otp has sent to your email</p>
        </div>
      </form>
    </div>
    
    </div>
 
    
 
 
    )
}

