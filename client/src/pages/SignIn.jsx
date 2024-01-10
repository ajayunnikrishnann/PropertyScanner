import React from 'react'
import {useState,useEffect} from 'react'

import { Link,useNavigate } from 'react-router-dom'
import { useGoogleRegisterMutation, useLoginMutation } from '../slices/usersApiSlice'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleLogin] = useGoogleRegisterMutation()
  const [login] = useLoginMutation()
  const { userInfo } = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userInfo) {
      navigate('/')
    }
  },[navigate,userInfo])

  const googleAuth = async (data) => {
    try {
        const {
            email,
            username: username,
            sub: googleId,
            picture: profileImageURL,
        } = data

        const userData ={
            username,
            email,
            googleId,
            profileImageName : profileImageURL,
        }
        const res = await googleLogin(userData).unwrap()
        dispatch(setCredentials({...res}))
        navigate('/')
    } catch(err){}
}

    const submitHandler = async (e) => {
      e.preventDefault()

      if(!email || !password) {
        toast.error('Both email and password are required')
      }else {
        try {
          const responseFromApiCall = await login ({email, password}).unwrap()
          if(responseFromApiCall){
            dispatch(setCredentials({...responseFromApiCall}))
            toast.success('Login Successfull')
            navigate('/')
          }else {
            toast.error('no details found')
          }
        } catch(err) {
          if (err.data && err.data.message) {
            toast.error(err.data.message)
          } else {
            toast.error('An error occurred. Please try again.')
          }
        }
      }
    }

  return (


    <div className="bg-cover bg-center bg-opacity-50 h-screen pt-14" style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
    <div  className='flex items-center justify-center p-8 pt-16'  >
      <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
        <h1
         className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
           style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}
         >
           SignIn
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
           type='password'
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

         <div className='flex flex-col items-center gap-2 mt-1 justify-center'>
        
           <p>Don't have an account?</p>
           <Link to="/register">
           <span className='text-cyan-950 text-stroke' style={{ WebkitTextStroke: '1px black ', textStroke: '1px black ' }}>
             Sign Up
           </span>
           </Link>
           <Link to="/forgotPassword">
            <span className='mt-1 font-bold '>Forgot Password</span>
            </Link>
         </div>
         <div style={{ paddingLeft: '43px' }}>
         <GoogleOAuthProvider clientId="743970121229-345bqp2jmct2p1p8006unrje07pdvctm.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential)
                      googleAuth(decoded)

                      console.log(decoded)
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}
                  />
                </GoogleOAuthProvider>
         </div>
       </form>
     </div>
  </div>
  )
}

export default SignIn