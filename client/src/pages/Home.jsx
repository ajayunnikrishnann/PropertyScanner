import React, { useEffect, useState } from "react";
import { useGetUserBannerQuery } from "../slices/usersApiSlice";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
const Home = () => {
  const [offerListings,setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);
  const [boostedListings, setBoostedListings] = useState([]);
  
  useEffect(() => {
    const fetchBoostedListings = async () => {
      try {
        const res = await fetch('/api/listing/get?isBoosted=true&limit=4');
        const data = await res.json();
        console.log('Boosted Listings:', data); // Add this line for debugging
        setBoostedListings(data);
        
      } catch (error) {
        console.log(error);
      }
    
    };
    fetchBoostedListings();
  

    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const { data: banners, isLoading, isError } = useGetUserBannerQuery();


  if (isLoading) {
   return   <Loading />
    // return <div>Loading banners...</div>;
  }

  return (
<div>
    <div className="min-h-screen flex flex-col items-stretch w-full">
    <Header /> 
    
    <div className="absolute inset-0 ">
      
      <div>     
      <img src={banners.image} alt="Banner" className="w-full h-full object-cover max-w-full" />
     
      <div >
        <div className="flex flex-col gap-4 top-0 p-16  lg:py-28 px-3  lg:max-w-6xl mx-auto absolute lg:top-2">
          <h1 className="text-slate-700 font-bold md:text-3xl lg:text-6xl">Find your next <span className="text-slate-500">perfect</span>
          <br />
          Home with ease
          </h1>
          {/* <div className="text-black  font-bold text-lg sm:text-lg">
              Property Scanner is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
          </div> */}
          <Link to={"/search"} className="text-xs sm:text-sm text-white font-bold ">
          <button className="bg-gradient-to-b  from-slate-500 via-slate-600 to-slate-700 rounded-br-full pl-2 pr-4  border border-gray-50 hover:text-gray-300">Click here for the perfect start...</button>
          </Link>
          </div>
        </div>
        
        </div>
        <div className="max-w-7xl pl-1 mx-auto  flex flex-col gap-4 ">
        {boostedListings && boostedListings.length > 0 && (
        <div className="max-w-7xl pl-1 mx-auto flex flex-col gap-4 ">
          <div className="">
            <div className="my-1">
              <h2 className="text-2xl font-semibold text-slate-600 ">Top Searches</h2>
              <Link className='text-sm text-blue-800 hover:underline' to='/search?isBoosted=true'>Show more</Link>
              {/* You can add a link to see more boosted listings if needed */}
            </div>

            <div className="flex flex-wrap gap-6">
            {boostedListings
          .filter((listing) => listing.isBoosted) // Filter only boosted listings
          .map((listing) => (
            <ListingItem listing={listing} key={listing._id} />
          ))}
            </div>
          </div>
        </div>
      )}

            {
              offerListings &&  offerListings.length > 0 && (
                <div className="">
                  <div className="my-1  ">
                      <h2 className="text-2xl font-semibold text-slate-600 ">Recent offers</h2>
                      <Link className='text-sm text-blue-800 hover:underline' to='/search?offer=true'>Show more offers</Link>
                  </div>

                  <div className="flex flex-wrap gap-6">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
             

                  </div>


                </div>
              )
            }

{
              rentListings &&  rentListings.length > 0 && (
                <div className="">
                  <div className="my-1  ">
                      <h2 className="text-2xl font-semibold text-slate-600 ">Recent places for rent</h2>
                      <Link className='text-sm text-blue-800 hover:underline' to='/search?type=rent'>Show more places for rent</Link>
                  </div>

                  <div className="flex flex-wrap gap-6">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
             
                  </div>

                </div>
              )
            }

{
              saleListings &&  saleListings.length > 0 && (
                <div className="">
                  <div className="my-1  ">
                      <h2 className="text-2xl font-semibold text-slate-600 ">Recent places for sale</h2>
                      <Link className='text-sm text-blue-800 hover:underline' to='/search?type=sale'>Show more places for sale</Link>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-6">
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
             
                  </div>

                </div>
              )
            }
        </div>
        <div className="z-10 ">
<Footer  />
</div>
    </div>
 
  </div>

</div>
 )  
  }
export default Home;