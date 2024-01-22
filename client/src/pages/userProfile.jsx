
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
    const maxSize = 4 * 1024 * 1024; // 2MB

    return allowedTypes.includes(file.type) && file.size <= maxSize;
  };


  const fetchUserProfile = async () => {
    const responseFromApiCall = await getProfile({
      email: userInfo.email,
      userId: userInfo,
    });
    if (responseFromApiCall) {
      const { userame, email, mobile, profileImageName } = responseFromApiCall.data.user;
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
            className="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1 ml-2"
          />
           {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>
      </div>
  
      <div className="flex flex-col gap-4 w-full">
        <p className="shrink-0 w-32 font-medium">Username</p>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="First Name"
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
      </div>
  
      <div className="flex flex-col gap-4 w-full">
        <p className="shrink-0 w-32 font-medium">Mobile</p>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="your.email@domain.com"
          className="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
        />
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
