import { React , useState } from 'react'
import { useChangePasswordMutation } from '../slices/usersApiSlice'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoaderComponent from '../components/loader'


function UserChangePassword() {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const [passwordError,setPasswordError] = useState('');
    const [confirmPasswordError,setConfirmPasswordError] = useState('');
    const email = sessionStorage.getItem('forgotPasswordEmail')
    const [ChangePassword,{isLoading}] = useChangePasswordMutation()
    const navigate = useNavigate()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validatePassword = () => {
      if (!password || !confirmPassword) {
        // If either password or confirmPassword is empty, no need to validate
        return;
      }
    
      if (!passwordRegex.test(password)) {
        setPasswordError(
          'Password should have 8 characters, digit, one special character, uppercase and lowercase.'
        );
      } else if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        setPasswordError(''); // Clear password error if passwords don't match
      } else {
        setPasswordError('');
        setConfirmPasswordError('');
      }
    };
    
    
    const validateEmptyFields = () => {
      let hasEmptyField = false;

      if (!password) {
        setPasswordError('Password is required');
        hasEmptyField = true;
      } else {
        setPasswordError('');
      }
  
      if (!confirmPassword) {
        setConfirmPasswordError('Confirm Password is required');
        hasEmptyField = true;
      } else {
        setConfirmPasswordError('');
      }
  
      return !hasEmptyField;
    }

    const submitHandler = async (e)=>{
        e.preventDefault()

        if (!validateEmptyFields()) {
          return;
        }

        validatePassword();

        try {
            if(password !== confirmPassword) {
                console.log(' password do not match')
            }else {
                const responseFromApiCall = await ChangePassword({
                    email,
                    password,
                }).unwrap()
                if(responseFromApiCall){
                    sessionStorage.removeItem('forgotPasswordEmail')
                    // toast.success('password changed sucessfully')
                    navigate('/sign-in')
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
    <div className="bg-cover bg-center bg-opacity-50 h-screen" style={{ backgroundImage: "url('/bgsignup.jpg')" }}>
    <div  className='flex items-center justify-center p-8 pt-28'  >
      <form className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
        <h1 
         className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
           style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}
         >
           Change Password
         </h1>
      
         <input
           type='password'
           placeholder='New Password'
           id='email'
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
         />
          {passwordError && <p className='text-red-700 text-sm font-semibold'>{passwordError}</p>}
        <input
           type='password'
           placeholder='Confirm New Password'
           id='email'
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePassword}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
         />
          {confirmPasswordError && <p className='text-red-700 text-sm font-semibold'>{confirmPasswordError}</p>}
         <button
           onClick={submitHandler}
           disabled={isLoading}
           className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70'
         >
           {isLoading ? (
            <LoaderComponent buttonText="Changing Password..." />
          ) : (
          'Change Password'
          )}
         </button>

       
       </form>
     </div>
  </div>
  )
}

export default UserChangePassword