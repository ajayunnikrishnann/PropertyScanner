


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Heading from '../components/Heading';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

import { useUpdateProfileMutation, useUsergetProfileMutation } from '../slices/usersApiSlice'; 

export default function UserProfile() {
  const [userData, setUserData] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [username, setUserName] = useState('');

  const [mobile, setMobile] = useState('');
  const [profileImage, setprofileImage] = useState(null);
  const [updateProfile] = useUpdateProfileMutation();
  const [getProfile] = useUsergetProfileMutation();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
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
        alert('Successfully updated');
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
    <>
    
      <div className="p-8">
        <Heading
          cName="hero"
          name="htext123"
          imageclass="coverUser"
          img="https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-company-profile-corporate-culture-exhibition-board-display-poster-material-image_131622.jpg"
          title="Your Profile"
        />
      </div>

      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src={userData.profileImageName}
                alt="avatar"
                className="rounded-full w-48 h-48 mx-auto mb-4"
              />
              <Button
                icon="pi pi-user-edit"
                className="w-full"
                onClick={() => setVisible(true)}
              />
            </div>
            {/* You can replace FileUpload with a Tailwind-styled input if needed */}
            <input
              type="file"
              id="profileimage"
              accept=".jpg, .jpeg, .png, .pdf,.avif"
              onChange={handleImage}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User name
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profileimage"
                    accept=".jpg, .jpeg, .png, .pdf,.avif"
                    onChange={handleImage}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4 w-full">
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
