// import { useState } from "react";
// import { Link } from "react-router-dom"

// export default function SignUp() {
// const [formData, setFormData] = useState({});
// const handleChange = (e)=>{
//   setFormData({
//     ...formData,
//     [e.target.id]: e.target.value,
//   })
// }

// const handleSubmit = async (e) =>{
//   e.preventDefault();
//   const res = await fetch('/api/auth/signup', 
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type' : 'application/json',
//     },
//     body: JSON.stringify(formData),
//   }
//   )
//   const data = await res.json();
//   console.log(data)
// }

// console.log(formData);    

//   return (

//     <div className="flex flex-col items-center justify-center  bg-cover bg-center bg-opacity-50 " >
//     <h1 className='text-2xl  text-center font-extrabold my-2 '>SignUp</h1>
      
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
//         <input type='text' placeholder='Username' id='username' onChange={handleChange} className='border p-3  rounded-lg  placeholder:text-white w-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
//         <input type='text' placeholder='Email' id='email' onChange={handleChange}  className='border p-3 rounded-lg  placeholder:text-white w-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
//         <input type='text' placeholder='Mobile number' id='mobile' onChange={handleChange} className='border  p-3 rounded-lg  placeholder:text-white w-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
//         <input type='text' placeholder='Password' id='password' onChange={handleChange} className='border p-3 rounded-lg  placeholder:text-white w-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
//         <input type='text' placeholder='Confirm password' id='confirmpassword' onChange={handleChange} className='border p-3 rounded-lg  placeholder:text-white w-full ' style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}/>
//       <button className='border w-full sm:w-96 mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-green-400 via-green-500 to-green-600  hover:opacity-85 disabled:opacity-70' >Sign Up</button>
//       <div className="flex gap-2 mt-1 justify-center ">
//         <p>Have an account?</p>
//         <Link to={"/sign-in"}>
//         <span className="text-blue-700">Sign In</span>
//         </Link>
//       </div>
//       </form>
//       </div>
    
    
    
    
//   )
// }

