
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import Heading from '../components/Heading';
// import { Button } from 'primereact/button';
// import { Image } from 'primereact/image';
import LoaderComponent from '../components/loader';
import { useUpdateProfileMutation, useUsergetProfileMutation } from '../slices/usersApiSlice'; 
import Header from '../components/Header';

export default function UserProfile() {
  const [userData, setUserData] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [username, setUserName] = useState('');
  const [imageError, setImageError] = useState('')
  const [mobile, setMobile] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [updateProfile,{isLoading}] = useUpdateProfileMutation();
  const [getProfile] = useUsergetProfileMutation();

  const isValidName = (name) => /^[a-zA-Z\s]*$/.test(name);
  const isValidMobile = (mobile) => /^[0-9]{0,10}$/.test(mobile);


  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = validateImage(file);
      if (isValid) {
        setFileToBase(file);
        setImageError('');
      } else {
        setImageError('Invalid image type or size');
      }
    }
   
  };

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 4 * 1024 * 1024; // 4MB

    if (!allowedTypes.includes(file.type)) {
      setImageError('Unsupported file type. Please select a valid image (jpeg, png, gif).');
      return false;
    }
  
    if (file.size > maxSize) {
      setImageError('File size exceeds the maximum limit (4MB). Please choose a smaller file.');
      return false;
    }
  
    setImageError('');
    return true;
  };


  const fetchUserProfile = async () => {
    const responseFromApiCall = await getProfile({
      email: userInfo.email,
      userId: userInfo,
    });
    if (responseFromApiCall) {
      const { username, email, mobile, profileImageName } = responseFromApiCall.data.user;
      setUserData({
        username,       
        email,
        mobile,
        profileImageName,
      });
      setUserName(responseFromApiCall.data.user.username);
      setMobile(responseFromApiCall.data.user.mobile);
      setVisible(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setprofileImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({
        email: userInfo.email,
        username,
        mobile,
        profileImage,
      });

      if (response && response.data) {
        fetchUserProfile();
        // alert('Successfully updated');
      } else {
        alert('An error occurred. Please try again.');
      }
    } catch (err) {
      if (err.data && err.data.message) {
        alert(err.data.message);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
     <Header />
    <div className="flex items-center justify-center">
    <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:rounded-xl sm:px-4 sm:py-1 md:mx-auto w-full">
      <p className="font-medium text-3xl mb-10 text-center">Profile Details</p>
  
      <div className="flex flex-col items-center gap-4 w-full">
        <img
          src={userData.profileImageName || '/userr.jpg'} 
          alt="Profile"
          className="h-28 w-28 rounded-full mb-4"
        />
  
        <div className="w-full flex justify-center">
          <input
            type="file"
            onChange={handleImage}
            accept=".jpg, .jpeg, .png, .gif"
            className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1 ml-2"
          />
           {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>
      </div>
  
      <div className="flex flex-col gap-4 w-full">
        <p className="shrink-0 w-32 font-medium">Username</p>
        <input
          value={username}
          onChange={(e) => {
            const newName = e.target.value;
            if (isValidName(newName)) {
              setUserName(newName);
            }
          }}
          placeholder="First Name"
          
          className={`w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 ${
            isValidName(username) ? '' : 'border-red-500'
          }`}
        />
        {!isValidName(username) && (
          <p className="text-red-500 text-sm">Invalid name format</p>
        )}
      </div>
  
      <div className="flex flex-col gap-4 w-full">
        <p className="shrink-0 w-32 font-medium">Mobile</p>
        <input
          value={mobile}
          onChange={(e) => {
            const newMobile = e.target.value;
            if (isValidMobile(newMobile)) {
              setMobile(newMobile);
            }
          }}
          placeholder="Mobile"
          className={`w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 ${
            isValidMobile(mobile) ? '' : 'border-red-500'
          }`}
        />
        {!isValidMobile(mobile) && (
          <p className="text-red-500 text-sm">Invalid mobile number format</p>
        )}
      </div>
  
      <div className="justify-center items-center w-full">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-3 rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-blue-700"
        >
          {isLoading ? (
            <LoaderComponent buttonText="Updating..." />
          ) : (
         'Update'
          )}
        </button>
      </div>
    </div>
  </div>
  </div>

  );
}
