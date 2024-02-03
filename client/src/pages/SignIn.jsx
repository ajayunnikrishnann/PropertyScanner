import React from 'react'
import {useState,useEffect} from 'react'
import LoaderComponent from '../components/loader'
import { Link,useNavigate } from 'react-router-dom'
import { useGoogleLoginMutation, useLoginMutation } from '../slices/usersApiSlice'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [errorMessage, setErrorMessage] = useState('');

  const [googleLogin] = useGoogleLoginMutation()
  const [login,{isLoading}] = useLoginMutation()
  const { userInfo } = useSelector((state)=> state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(userInfo) {
      navigate('/')
    }
  },[navigate,userInfo])

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    console.log(decoded);
    const googleName = decoded.name;
    const googleEmail = decoded.email;

    const responseFromApiCall = await googleLogin({
      googleName,
      googleEmail,
    }).unwrap();
    dispatch(setCredentials({ ...responseFromApiCall }))
    navigate("/")
  }

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Invalid password format.');
    } else {
      setPasswordError('');
    }
  };


    const submitHandler = async (e) => {
      e.preventDefault()

      setErrorMessage('')

      if(!email || !password) {
        setErrorMessage('Both email and password are required')
      }else {
        try {
          const responseFromApiCall = await login ({email, password}).unwrap()
          if(responseFromApiCall){
            dispatch(setCredentials({...responseFromApiCall}))
            // toast.success('Login Successfull')
            navigate('/')
          }else {
            setErrorMessage('no details found')
          }
        } catch(err) {
          if (err.data && err.data.message) {
            setErrorMessage(err.data.message)
          } else {
            setErrorMessage('An error occurred. Please try again.')
          }
        }
      }
    }

  return (
<div className="h-screen overflow bg-cover bg-center bg-opacity-50  " style={{ backgroundImage: "url('/bgsignup.jpg')" }}>
   
<div className="flex items-start">
  <Link to="/">
    <h1 className="font-bold text-sm sm:text-xl flex items-start">
      <img src="/logo3.png" alt="Logo" className="w-20 object-cover h-auto" />
      <span className="ml-4">
        <span className="bg-cyan-700 font-bold to-slate-200 inline-block text-transparent bg-clip-text absolute top-0 left-9 m-4 text-stroke"  style={{ WebkitTextStroke: '0.25px ', textStroke: '0.25px ' }}>PropertyScanner</span> 
      </span>
    </h1>
  </Link>
</div>

    <div  className='flex items-center justify-center  '  >
      <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-cyan-100	 bg-opacity-50 ' >
        <h1
         className='text-3xl text-center bg-gradient-to-b  from-cyan-500 via-cyan-600 to-cyan-700 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
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
           onBlur={validateEmail}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white '
         />
           {emailError && <p className='text-red-700 text-sm font-semibold'>{emailError}</p>}
      
         <input
           type='password'
           placeholder='Password'
           id='password'
           value={password}
           onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white '
         />
          {passwordError && <p className='text-red-700 text-sm font-semibold'>{passwordError}</p>}

         <button
          onClick={submitHandler}
          disabled={isLoading}
           className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900  hover:opacity-85 disabled:opacity-70'
         >
           {isLoading ? (
            <LoaderComponent buttonText="Signing In..."/>
          ) : (
         ' Sign In'
          )}
         </button>

         {errorMessage && <p className='text-red-700 text-sm font-semibold'>{errorMessage}</p>}

         <div className='flex flex-col items-center gap-2 mt-1 justify-center'>
        
           <p>Don't have an account?</p>
           <Link to="/register">
           <span className='text-cyan-950 text-stroke' style={{ WebkitTextStroke: '1px black ', textStroke: '1px black ' }}>
             Sign Up
           </span>
           </Link>
           <Link to="/forgotPassword">
            <span className='mt-1 font-bold text-white '>Forgot Password</span>
            </Link>
         </div>
         <div style={{ paddingLeft: '43px' }}>
         <GoogleOAuthProvider clientId="743970121229-345bqp2jmct2p1p8006unrje07pdvctm.apps.googleusercontent.com">
            <GoogleLogin  onSuccess={handleSuccess}
            onError={()=>{
                toast.error('failed to verify')
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