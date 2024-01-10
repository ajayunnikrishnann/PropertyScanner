import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation, useVerifyregistrationMutation,useGoogleRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('')
  const [verify] = useVerifyregistrationMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [login] = useRegisterMutation();
 const [googleLogin] = useGoogleRegisterMutation()

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !mobile || !password || !confirmPassword) {
      toast.error('All fields are required for signup');
      return;
    }

    const mobileRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
      if (!mobileRegex.test(mobile)) {
        toast.error('Invalid mobile number. Please enter a 10-digit number');
      } else if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else if (!passwordRegex.test(password)) {
        toast.error(
          'Password should have 8 characters, digit, one special character, uppercase and lowercase',
        );
      } else {
        const res = await login({
          username,
          mobile,
          email,
          password,
        }).unwrap();
        if (res) {
          setVisible(true);
          setIsModalOpen(true)
        }
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message);
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  const otpHandler = async()=>{
    
    console.log("otp handler called");
    const responseFromApiCall = await verify({
     username,
     mobile,
     email,
     password,
     otp
    }).unwrap()
    if(responseFromApiCall){
        console.log(responseFromApiCall);
    navigate('/sign-in')
    toast.success('registartion sucessfull')
  }
    }

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

  return (
    <div className="bg-cover bg-center bg-opacity-50 pt-14 " style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
    <div  className='flex items-center justify-center p-4'  >
      <form className='flex flex-col gap-2 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
        <h1
          className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2'
          style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}
        >
          SignUp
        </h1>
        <input
          type='text'
          placeholder='Username'
          id='username'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-white w-full text-white'
        />
        <input
          type='text'
          placeholder='Email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
        />
        <input
          type='text'
          placeholder='Mobile number'
          id='mobile'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white '
        />
        <input
          type='password'
          placeholder='Confirm password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-white w-full text-white'
        />

        <button
         
          onClick={submitHandler}
          className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-50'
        >
          Sign Up
        </button>

        


        <div className='flex gap-2 mt-1 justify-center '>
            
          <p>Have an account?</p>
          < Link to= "/sign-in">
          <span className='text-cyan-950 text-stroke' style={{ WebkitTextStroke: '1px ', textStroke: '1px ' }}>
            Sign In
                                       
          </span>
          </Link>
          
        </div>
        <div style={{ paddingLeft: '43px' }}>
            <GoogleOAuthProvider clientId="743970121229-345bqp2jmct2p1p8006unrje07pdvctm.apps.googleusercontent.com">
            <GoogleLogin  onSuccess={(credentialResponse)=>{
                const decoded = jwtDecode(credentialResponse.credential)
                googleAuth(decoded)
            }}
            onError={()=>{
                toast.error('failed to verify')
            }}
            />
            </GoogleOAuthProvider>
          </div>
      </form>
    </div>


    
    <div className='flex items-center justify-center p-16'  >
        <Dialog visible={visible} onHide={() => { setVisible(false); setIsModalOpen(false);}}>
    
    <div className='flex flex-col gap-3  border-2 border-cyan-800 p-6 rounded-lg sm:w-96  bg-black bg-opacity-80 ' >
      <h1  className='text-3xl  text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800  inline-block text-transparent bg-clip-text  font-extrabold    text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>Verify OTP </h1>
       <input type='text' placeholder='Enter your OTP' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='border-2  border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-white w-full text-white ' />
       <button onClick= {()=> otpHandler()} className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >Verify</button>
       
       <div className="flex gap-2 mt-1 justify-center ">
         <p>An otp has sent to your email</p>
         </div>
       </div>
     
     </Dialog>
     </div>
  </div>
    
  );
};

export default Register;
