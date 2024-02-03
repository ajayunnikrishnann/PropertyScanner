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
    const [emailError,setEmailError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    const validateEmail = () => {
      if (!email) {
        setEmailError('Email is required');
      }else if (!emailRegex.test(email)) {
        setEmailError('Invalid email format.');
      } else {
        setEmailError('');
      }
    };

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
          validateEmail();

            if(!emailError){
                sessionStorage.setItem('forgotPasswordEmail',email)
                const responseFromApiCall = await verifyEmail({ email }).unwrap()
                if(responseFromApiCall.success){
                    navigate('/verifyotp')
                }
            }
        } catch (err) {
            if (err.data && err.data.message) {
              console.log(err.data.message)
              } else {
                setErrorMessage('An error occurred. Please try again.')
              }
        }
    }
  return (
    
    <div className="bg-cover bg-center bg-opacity-50 h-screen " style={{ backgroundImage: "url('/bgsignup.jpg')" }}>

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

    
    <div  className='flex items-center justify-center  pt-24'  >
      <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-cyan-100	 bg-opacity-50 ' >
        <h1
         className='text-3xl text-center bg-gradient-to-b  from-cyan-500 via-cyan-600 to-cyan-700 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
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
          onBlur={validateEmail}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full '
         />
          {emailError && <p className='text-red-700 text-sm font-semibold'>{emailError}</p>}
         <button
          onClick={submitHandler}
          disabled={isLoading}
           className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900  hover:opacity-85 disabled:opacity-70'
         >
          {isLoading ? (
            <LoaderComponent buttonText="Proceeding..."/>
          ) : (
         'Proceed'
          )}
         </button>
         
         {errorMessage && (
  <p className='text-red-700 text-sm font-semibold'>
    {errorMessage}
  </p>
)}

         <div className='flex flex-col items-center gap-2 mt-1 justify-center'>
        
           <p>Remember now?</p>
           <Link to="/sign-in">
           <span className='text-black text-stroke' style={{ WebkitTextStroke: '1px ', textStroke: '1px ' }}>
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