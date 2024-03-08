import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import LoaderComponent from '../components/loader'
import { useOtpVerifyMutation, useResendOtpMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
const Otp = () => {
    const [otp,setOtp] = useState('')
    const [otpError, setOtpError] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [verifyOtp,{isLoading}] = useOtpVerifyMutation();
    const [resendOtpMutation,{isLoading:resendOtpLoading}] = useResendOtpMutation();
    const [showResendButton, setShowResendButton] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        // Show the resend button after one minute
        if (countdown === 0) {
            setShowResendButton(true);
        }
    }, [countdown]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // setIsLoading(true);

        try {
            const res = await verifyOtp({ otp }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            setOtp('')
            if (err?.data?.message) {
                setOtpError(err?.data?.message)
            } else {
                setOtpError(err?.data?.message || err.error);
            }
        } 
    };


    const resendOtpHandler = async () => {
        console.log('Resend OTP button clicked');
        try {
            setIsLoading(true);
            toast.info('Resending OTP...');
            await resendOtpMutation().unwrap();
            toast.success('New OTP sent successfully!');
            setShowResendButton(false); 
            setCountdown(60); 
        } catch (error) {
            setOtpError(error?.data?.message || error.error);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div>
      <div className="bg-cover bg-center bg-opacity-50 h-screen" style={{ backgroundImage: "url('/bgsignup.jpg')" }}>
    <div className='flex items-center justify-center p-16 pt-36'  >
    
    <div className='flex flex-col gap-3 border-2 border-cyan-800 p-6 rounded-lg sm:w-96 bg-teal-700 bg-opacity-50 ' >
  <h1  className='text-3xl text-center bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800 inline-block text-transparent bg-clip-text font-extrabold text-stroke pt-2' style={{WebkitTextStroke: "1px black",textStroke: "1px black" }}>Verify OTP </h1>
  {countdown > 0 ? (
                <p className='text-white' >OTP will expire in {countdown} seconds</p>
            ) : (
                <p className='text-white'>Time to enter OTP has expired. Click <b>Resend OTP</b> to get a new one.</p>
            )}
   <input type='text' placeholder='Enter your OTP' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='border-2 border-cyan-800 p-3  rounded-lg bg-transparent placeholder:text-white w-full text-white' />
   
   <button 
   onClick={submitHandler}
   disabled={isLoading}
    className='border-2 border-cyan-800 w-full  mt-2 p-3 my-1 text-white font-bold rounded-lg  bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800  hover:opacity-85 disabled:opacity-70' >
      {isLoading ? (
            <LoaderComponent buttonText="Verifying..." />
          ) : (
          'Verify'
          )}
      </button>
      {otpError && (
              <p className='text-red-700 text-sm font-semibold'>
                Wrong OTP. Please enter the correct OTP.
              </p>
            )}

            {(loading ||resendOtpLoading)}

        {showResendButton && (
                    <button
                        
                        className="mt-3"
                        onClick={resendOtpHandler}
                        disabled={loading}
                    >
                        Resend OTP
                    </button>
                )}

   <div className="flex gap-2 mt-1 justify-center ">
     <p>An otp has sent to your email</p>
     </div>
   </div>


 </div>
  </div>
    </div>
  )
}

export default Otp
