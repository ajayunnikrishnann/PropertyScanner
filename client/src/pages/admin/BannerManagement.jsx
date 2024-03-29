import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useCreateBannerMutation,
  useGetBannersQuery,
  useDeleteBannerMutation,
} from '../../slices/bannerApiSlice';
import { setBanners } from '../../slices/bannerSlice';


const BannerManagement = () => {
  const dispatch = useDispatch();
  const { data: banners, isLoading, isError } = useGetBannersQuery();
  const [createBanner] = useCreateBannerMutation();

  const [deleteBanner] = useDeleteBannerMutation();

  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [imageError, setImageError] = useState('');

  // useEffect(() => {
  //   dispatch(setBanners(banners));
  // }, [banners, dispatch]);
  
  const handleCreateBanner = async () => {
    try {


     const response = await createBanner({bannerImage,bannerTitle});

     if(response){
      toast.success("Success banner")
     }


     
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  // const handleUpdateBanner = async (id) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('title', bannerData.title);
  //     formData.append('image', bannerData.image);
  //     formData.append('link', bannerData.link);

  //     await updateBanner({ id, formData });
  //     dispatch(setBanners());
  //     setBannerData({ title: '', image: null, link: '' });
  //   } catch (error) {
  //     console.error('Error updating banner:', error);
  //   }
  // };

  const handleDeleteBanner = async (id) => {
    try {
      await deleteBanner(id);
      const updatedBanners = banners.filter((banner) => banner._id !== id);
      dispatch(setBanners(updatedBanners));
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      const isValid = validateImage(file);
      if (isValid) {
    setFileToBase(file)
    setImageError('');
  } else {
    setImageError('Invalid image type or size');
  }
    }}
  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setBannerImage(reader.result)
    }

  }

  const validateImage = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 6 * 1024 * 1024; // 6MB

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Banner Management</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Create Banner</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Title"
            className="p-2 border rounded"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value) }
          />
          <input
             type="file"
               id="idimage"
               accept=".jpg, .jpeg, .png, .gif"
                 onChange={handleImage}
                    />
                {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
          <button
            className="bg-cyan-800 text-white px-4 py-2 rounded"
            onClick={handleCreateBanner}
          >
            Create
          </button>
        </div>
      </div>

      {isLoading && <p>Loading banners...</p>}

      {isError && <p>Error loading banners.</p>}

      {banners && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Banners</h3>
          <ul>
            {banners.map((banner) => (
              <li key={banner._id} className="mb-2">
                <p>{banner.title}</p>
                <img src={banner.image} alt="Banner" style={{ maxWidth: '100px' }} />
                <p>{banner.link}</p>
                {/* <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleUpdateBanner(banner._id)}
                >
                  Update
                </button> */}
                <button
                  className="bg-red-500  text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteBanner(banner._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;