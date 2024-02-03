import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation, useVerifyregistrationMutation,useGoogleLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";





import LoaderComponent from '../components/loader';


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
  const [otpError, setOtpError] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const [login,{isLoading}] = useRegisterMutation();
 const [googleLogin] = useGoogleLoginMutation();

 const [usernameError, setUsernameError] = useState('');
 const [emailError,setEmailError] = useState('');
 const [mobileError,setMobileError] = useState('');
 const [passwordError,setPasswordError] = useState('');
 const [confirmPasswordError,setConfirmPasswordError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

    const usernameRegex = /^[a-zA-Z]{4,12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateUsername = () => {
      if (!username) {
        setUsernameError('Username is required');
      } else if (!usernameRegex.test(username)) {
        setUsernameError('Invalid characters in username. Use alphabets only and check length of username is between 4-12');
      } else {
        setUsernameError('');
      }
    };

    const validateEmail = () => {
      if (!email) {
        setEmailError('Email is required');
      }else if (!emailRegex.test(email)) {
        setEmailError('Invalid email format.');
      } else {
        setEmailError('');
      }
    };

    const validateMobile = () => {
      if (!mobile) {
        setMobileError('Mobile number is required');
      }else if (!mobileRegex.test(mobile)) {
        setMobileError('Invalid mobile number. Please enter a 10-digit number.');
      } else {
        setMobileError('');
      }
    };

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
  
      if (!username) {
        setUsernameError('Username is required');
        hasEmptyField = true;
      } else {
        setUsernameError('');
      }
  
      if (!email) {
        setEmailError('Email is required');
        hasEmptyField = true;
      } else {
        setEmailError('');
      }
  
      if (!mobile) {
        setMobileError('Mobile number is required');
        hasEmptyField = true;
      } else {
        setMobileError('');
      }
  
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
    };


  const submitHandler = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!validateEmptyFields()) {
      return;
    }

    validateUsername();
    validateEmail();
    validateMobile();
    validatePassword();

    // if (!username || !email || !mobile || !password || !confirmPassword) {
    //   setUsernameError(username ? '' : 'Username is required');
    //   setEmailError(email ? '' : 'Email is required');
    //   setMobileError(mobile ? '' : 'Mobile number is required');
    //   setPasswordError(password ? '' : 'Password is required');
    //   setConfirmPasswordError(confirmPassword ? '' : 'Confirm Password is required');
    //   // toast.error('All fields are required for signup');
    //   return;
    // }

  
    try {
      if (usernameError || emailError || mobileError || passwordError) {
       setErrorMessage('Please fix the validation errors before submitting.');
        return;
      }
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
      
    } catch (err) {
      if (err.data && err.data.message) {
        setErrorMessage(err.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const otpHandler = async()=>{
    try {
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
    // toast.success('registartion sucessfull')
  }
    }catch (err){
      if (err.data && err.data.message) {
        setErrorMessage(err.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setOtpError(true);
    }
  }
    // const googleAuth = async (data) => {
    //     try {
    //         const {
    //             email,
    //             username: username,
    //             sub: googleId,
    //             picture: profileImageURL,
    //         } = data

    //         const userData ={
    //             username,
    //             email,
    //             googleId,
    //             profileImageName : profileImageURL,
    //         }
    //         const res = await googleLogin(userData).unwrap()
    //         dispatch(setCredentials({...res}))
    //         navigate('/')
    //     } catch(err){}
    // }


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

    // const handleInputChange = (e, field) => {
    //   const value = e.target.value;
  
    //   switch (field) {
    //     case 'username':
    //       setUserName(value);
    //       validateUsername();
    //       break;
    //     case 'email':
    //       setEmail(value);
    //       validateEmail();
    //       break;
    //     case 'mobile':
    //       setMobile(value);
    //       validateMobile();
    //       break;
    //     case 'password':
    //       setPassword(value);
    //       validatePassword();
    //       break;
    //     case 'confirmPassword':
    //       setConfirmPassword(value);
    //       validatePassword(); // Check password match
    //       break;
    //     default:
    //       break;
    //   }
    // };


  return (
 <div>
    <div className="min-h-screen overflow-hidden bg-cover bg-center bg-opacity-50  " style={{ backgroundImage: "url('public/bgsignup.jpg')" }}>
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
    <div  className='flex items-center justify-center p-0.5 '  >
      <form className='flex flex-col gap-1 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-cyan-100	 bg-opacity-50 ' >
        <h1
          className='text-3xl text-center mt-1 bg-gradient-to-b  from-cyan-500 via-cyan-600 to-cyan-700 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-0.5 '
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
          onBlur={validateUsername}
          className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white'
        />
        {usernameError && <p className='text-red-700 text-sm font-semibold'>{usernameError}</p>}
        <input
          type='text'
          placeholder='Email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white'
          />
           {emailError && <p className='text-red-700 text-sm font-semibold'>{emailError}</p>}
        <input
          type='text'
          placeholder='Mobile number'
          id='mobile'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          onBlur={validateMobile}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white'
        />
         {mobileError && <p className='text-red-700 text-sm font-semibold'>{mobileError}</p>}
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
        <input
          type='password'
          placeholder='Confirm password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePassword}
          className='border-2 border-cyan-800 p-3 rounded-lg bg-transparent placeholder:text-cyan-950 w-full text-white'
        />
        {confirmPasswordError && <p className='text-red-700 text-sm font-semibold'>{confirmPasswordError}</p>}
        <button
          onClick={submitHandler}
          disabled={isLoading}
          className='border-2 border-cyan-800 w-full  mt-2 p-2 my-1 text-cyan-950 font-bold rounded-lg  bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900  hover:opacity-85 disabled:opacity-50'
        >
          {isLoading ? (
            <LoaderComponent buttonText="Signing Up..." />
          ) : (
         ' Sign Up'
          )}
        </button>


        {otpError && (
              <p className='text-red-700 text-sm font-semibold'>
                Wrong OTP. Please enter the correct OTP.
              </p>
            )}
        


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
            <GoogleLogin  onSuccess={handleSuccess}
            onError={()=>{
                toast.error('failed to verify')
            }}
            
            />
            </GoogleOAuthProvider>
          </div>
          {errorMessage && (
  <p className='text-red-700 text-sm font-semibold'>
    {errorMessage}
  </p>
)}
      </form>
      
    </div>
       

    
    <div className='flex items-center justify-center p-16'  >
        <Dialog visible={visible} onHide={() => { setVisible(false); setIsModalOpen(false);}}>
    
    <div className='flex flex-col gap-3  border-2 border-cyan-800 p-6 rounded-lg sm:w-96  bg-black bg-opacity-80 ' >
      <h1  className='text-3xl  text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800  inline-block text-transparent bg-clip-text  font-extrabold    text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>Verify OTP </h1>
       <input type='text' placeholder='Enter your OTP' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='border-2  border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-white w-full text-white ' />
       <button
        onClick= {()=> otpHandler()} 
        disabled={isLoading}
        className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >
          {isLoading ? (
            <LoaderComponent buttonText="Verifying..." />
          ) : (
          'Verify'
          )}
          </button>
       
       <div className="flex gap-2 mt-1 justify-center ">
         <p>An otp has sent to your email</p>
         </div>
       </div>
     
     </Dialog>
     </div>
  </div>
  </div>
  );
};

export default Register;