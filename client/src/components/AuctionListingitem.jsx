import { Link } from "react-router-dom"
import {MdLocationOn} from 'react-icons/md'
import { FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useDisclosure, Button } from '@chakra-ui/react';
import AuctionRegistrationModal from '../components/AuctionRegistration'

function AuctionListingItem({listing}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [winnerInfo, setWinnerInfo] = useState(null);
  const  {userInfo}  = useSelector((state) => state.auth)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const expirationDate = new Date(listing.expiresOn);

    
    const timeRemaining = expirationDate - now ;

  

    const timeLeft = Math.max(timeRemaining, 0);

    return timeLeft;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const handleRegistration = async (registrationData ) => {
    try {
      console.log('Submitting data:', registrationData);
      const dataWithListingId = { ...registrationData, listingId: listing._id }

      // Make the API call to the backend
      const response = await fetch('/api/listing/registerAuction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithListingId),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Registration successful');
        // You can also do something else here, like showing a success message
      } else {
        // If the server returns an error (status code not in 2xx range)
        console.error('Registration failed:', response.status);
        // You can handle the error here, show an error message, etc.
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Registration failed:', error.message);
    }
    
    // Close the modal after successful registration or in case of an error
    onClose();
  };
  
  useEffect(() => {
    // Fetch your listings data from an API endpoint or any other source
    // and set the state with the data.
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/listing/getWinner/${listing._id}`);
        // Replace with your API endpoint
        const data = await res.json();

        // Log the data to understand its structure
        console.log('Data received:', data);

        // Check if data is an array before applying filter
        if (Array.isArray(data)) {
          setAuctionListings(data.filter(listing => listing.isAuction));
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching auction listings:', error);
      }
    };

    fetchData();
  }, []);

  const handleWinner = async (listingId) => {
    try {
      // Step 1: Choose the winner
      const chooseWinnerResponse = await fetch(`/api/listing/chooseWinner/${listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (chooseWinnerResponse.ok) {
        const chooseWinnerResult = await chooseWinnerResponse.json();
        console.log('Winner chosen successfully', chooseWinnerResult);
  
        // Step 2: Fetch winner information separately
        const getWinnerResponse = await fetch(`/api/listing/getWinner/${listingId}`);
        console.log(getWinnerResponse, "getWinnerResponse");
        if (getWinnerResponse.ok) {
          const getWinnerResult = await getWinnerResponse.json();
          console.log('Winner information fetched successfully', getWinnerResult);
  
          // Check if the winnerInfo key exists in the response
          if (getWinnerResult.winnerInfo) {
            // setWinnerInfo(getWinnerResult.winnerInfo.winner);
            const winnerData = getWinnerResult.winnerInfo.winner;
            setWinnerInfo({
              username: winnerData.username,
              auctionAmount: winnerData.auctionAmount
            });
          } else {
            console.error('Winner information is missing in the response:', getWinnerResult);
          }
        }
      }
    } catch (error) {
      // console.error('Error choosing or getting winner:', error.message);
      toast.warning('No one applied for bidding.');
    }
  };
  

  // const handleWinner = async () => {
  //   try {
  //     // Step 1: Choose the winner
  //     const response = await fetch(`/api/listing/chooseWinner/${listing._id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log('Winner chosen successfully', result);
  
  //       // Step 2: Update winner information in the state
  //       setWinnerInfo(result.winnerInfo);
  //     }
  //   } catch (error) {
  //     console.error('Error choosing winner:', error.message);
  //   }
  // };


  
  
  
  return (
    <div className=" bg-slate-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
     <Link to={`/listingFeatureAuction/${listing._id}`}> 
        <img src={listing.imageUrls[0] || 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'} 
        alt="listing cover" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"/>
        <div className="p-3 flex flex-col gap-2">
        <div className="flex items-center text-green-500 mb-2">
            {listing.isBoosted && <FaCheck className="mr-1" />}
            <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
            </div>
            <div className="flex items-center gap-2">
                <MdLocationOn className="h-4 w-4 text-green-500"/>
                <p className="text-sm text-gray-600 truncate w-full">{listing.address}</p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
            <p className="text-slate-500 mt-2 font-semibold">₹{listing.offer
              ? listing.discountPrice.toLocaleString('en-IN')
              : listing.regularPrice.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
            </p>
            <div className="text-slate-700 flex gap-4">
                <div className="font-bold text-xs">
                    {listing.bedrooms > 1 ? `${listing.bedrooms}
                    beds` : `${listing.bedrooms} bed`}
                </div>
                <div className="font-bold text-xs">
                    {listing.bathrooms > 1 ? `${listing.bathrooms}
                    baths` : `${listing.bathrooms} bed`}
                </div>
            </div>
          
        </div>
        {timeLeft <= 0 && winnerInfo ? (
        <div className=" border  bg-green-400 p-2 mt-1">
          <p className="font-bold uppercase flex items-center justify-center">Winner: {winnerInfo.username}</p>
          <p className="font-bold  flex items-center justify-center">Amount: ₹{winnerInfo.auctionAmount}</p>
        </div>
      ) : (
        <div>
          <p className="font-bold text-center">{`Time Left: ${days}d ${hours}h ${minutes}m ${seconds}s`}</p>
          <h4 className="text-black font-medium text-center">
            {winnerInfo ? `Winner: ${winnerInfo.username}` : 'We will display the name of the highest bidder at the end of the bidding section'}
          </h4>
        </div>
      )}
     </Link>
     {userInfo && listing.userRef !== userInfo._id && timeLeft > 0 &&(
     <button onClick={onOpen} className="bg-blue-500 text-white p-2 rounded mt-6 w-full">
        Apply for Bidding
      </button>
     
     )}
      {userInfo && timeLeft <= 0 && (
     <button onClick={() => handleWinner(listing._id)}  style={{ position: 'relative' }} className="bg-slate-500   text-white p-2 rounded mt-6 w-full">
       Choose winner
      </button>
     
     )}
     

     
      <AuctionRegistrationModal isOpen={isOpen} onClose={onClose} onRegister={handleRegistration} listingId={listing._id} userInfo={userInfo}/>
    </div>
  )
}

export default AuctionListingItem
