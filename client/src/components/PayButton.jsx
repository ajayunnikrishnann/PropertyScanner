import axios from "axios"
import { useSelector } from 'react-redux'
import { useState,useEffect } from "react";
export const url = "https://www.propertyscanner.ajayunnikrishnan.live/api";

const PayButton = ({listing}) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [today, setToday] = useState(null);
//     const [listing, setListing] = useState({
//     // ... your other listing properties
//     expiresOn: new Date('2022-12-31'), // Example expiration date, replace with your actual date
//   });
  const [daysUntilExpiration, setDaysUntilExpiration] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (listing.expiresOn) {
        try {
          const currentDate = new Date();
          setToday(currentDate);
          
          const timeDifference = new Date(listing.expiresOn).getTime() - currentDate.getTime();
          const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
          console.log(daysDifference);
          setDaysUntilExpiration(daysDifference);
          
          if (daysDifference<1) {
            console.log('unboost');
            const listingId = listing._id;
            
            const res = await fetch(`/api/listing/unBoost/${listingId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            });
  
            // Check if the request was successful (status code 2xx)
            if (res.ok) {
              // Handle the success case
              // const data = await res.json();
              // Handle data if needed
            } else {
              // Handle the error case
              console.error('Error:', res.status, res.statusText);
            }
          }
        } catch (error) {
          console.error(error.message);
        }
      }
    };
  
    fetchData();
  }, [listing.expiresOn]);
  

    const handleCheckout = () =>{

      if (listing.isBoosted) {
        alert("This property is already boosted.");
        return;
    }
       axios.post(`${url}/stripe/create-checkout-session`, {
        listingId: listing._id, 
        userId: userInfo._id,
       
       }).then((res)=> {
        
        console.log("Server Response:", res.data);
        if(res.data.url){
            window.location.href = res.data.url
        }
       }).catch((err)=> console.log(err.message))
    };
    return(
        <>
        <button
         className={`text-${listing.isBoosted ? 'red' : 'green'}-700  font-medium  pl-4 pr-4 `}
                onClick={handleCheckout}
                disabled={listing.isBoosted}  // Disable if already boosted
            >
                {listing.isBoosted ? `Expires On ${daysUntilExpiration} Days` : "Boost Property"}
            </button>
        </>
    )
}

export default PayButton;