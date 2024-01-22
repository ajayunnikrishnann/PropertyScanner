import { React , useState } from 'react'
import { useChangePasswordMutation } from '../slices/usersApiSlice'
import { Link,useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoaderComponent from '../components/loader'


function UserChangePassword() {
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]= useState('')
    const email = sessionStorage.getItem('forgotPasswordEmail')
    const [ChangePassword,{isLoading}] = useChangePasswordMutation()
    const navigate = useNavigate()

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            if(password !== confirmPassword) {
                toast.error(' password do not match')
            }else {
                const responseFromApiCall = await ChangePassword({
                    email,
                    password,
                }).unwrap()
                if(responseFromApiCall){
                    sessionStorage.removeItem('forgotPasswordEmail')
                    toast.success('password changed sucessfully')
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
    <div className="bg-cover bg-center bg-opacity-50 h-screen" style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
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
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
         />

        <input
           type='password'
           placeholder='Confirm New Password'
           id='email'
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
          
           className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
         />

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