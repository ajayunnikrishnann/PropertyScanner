import { Link } from "react-router-dom"

function SignUp() {
  return (
   
    <div className="h-screen overflow-hidden ">
    <div className="bg-cover bg-center bg-opacity-50 h-screen " style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
      <div  className="flex flex-col items-center justify-start h-full ">
      <h1 className='text-3xl text-center font-extrabold my-7'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' id='username' className='border p-3  rounded-lg sm:w-80  placeholder:text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
        <input type='text' placeholder='Email' id='email' className='border p-3 rounded-lg sm:w-80 placeholder:text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
        <input type='text' placeholder='Mobile number' id='mobile' className='border  p-3 rounded-lg sm:w-80 placeholder:text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
        <input type='text' placeholder='Password' id='password' className='border p-3 rounded-lg sm:w-80 placeholder:text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
        <input type='text' placeholder='Confirm password' id='password' className='border p-3 rounded-lg sm:w-80 placeholder:text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
      <button className='border p-3 my-9 text-white font-bold rounded-lg sm:w-80 bg-gradient-to-r from-green-400 via-green-500 to-green-600  hover:opacity-85 disabled:opacity-70' >Sign Up</button>
      </form>
      <div className="flex gap-2 mt-0">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
    </div>
    </div>
    
  )
}

export default SignUp