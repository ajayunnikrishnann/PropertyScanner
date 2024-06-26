import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import { useSelector } from 'react-redux'
import 'swiper/css/bundle';
import {
     FaShare,
     FaMapMarkerAlt,
     FaBed,
     FaBath,
     FaParking,
     FaChair
 } from 'react-icons/fa';
import Contact from '../components/Contact';
import ChatButton from '../components/ChatButton';
import Loading from '../components/Loading';

export default  function Listing() {
    SwiperCore.use([Navigation]);
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact,setContact] = useState(false)

   

    const  {userInfo}  = useSelector((state) => state.auth)
    const params= useParams();


    useEffect(()=>{
      console.log('Params:', params);
        const fetchListing = async () => {
            try {
                setLoading(true)

                if (!params.listingId || params.listingId === 'undefined') {
                  console.error('Listing ID is missing or undefined');
                  setError(true);
                  setLoading(false);
                  return;

              }
                console.log('Listing ID:', params.listingId);

                const res = await fetch(`/api/listing/get/${params.listingId}`)
                if (!res.ok) {
                  setError(true);
                  setLoading(false);
                  return;
                }
                const data = await res.json();
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false)
            } catch (error) {
              console.error('Error fetching listing:', error);
                setError(true)
                setLoading(false);
            }
           
        }
        fetchListing()
    },[params.listingId])



  return (
    <div className='min-h-screen flex flex-col items-stretch'>
        <Header />
    <main>
    
        {loading && <p className='text-center my-7 text-2xl'><Loading /></p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}

        
        {listing && !loading && !error && 
        <div className='absolute inset-0 '> 

        <Swiper navigation>
            {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
                <div
                 className='h-[400px] flex items-center justify-center  bg-white pt-20'
                  >
        <img
          src={url}
          alt="Listing"
          className='max-h-full max-w-full rounded-md'
        />
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center  items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-2'>
          <p className='text-2xl font-semibold  '>
          {listing.name} - ₹{' '}
          {listing.offer
           ? listing.discountPrice.toLocaleString('en-IN')
           : listing.regularPrice.toLocaleString('en-IN')}
            {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-0 gap-0 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
                <p className='bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {
                listing.offer && (
                    <p className='bg-cyan-950 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                        ₹{+listing.regularPrice - 
                        +listing.discountPrice}  Off</p>
                        
                )}
            </div>
            <p className='text-slate-800'>
            <span className='font-semibold text-black'>Description -</span>
            {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBed className='text-lg' />
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds ` : 
                    `${listing.bedrooms} bed`
                     }
                </li>

                <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaBath className='text-lg' />
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths ` : 
                    `${listing.bathrooms} bath`
                     }
                </li>

                <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaParking className='text-lg' />
                    {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>

                <li className='flex items-center gap-1 whitespace-nowrap'>
                    <FaChair className='text-lg' />
                   {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
            </ul>
            {userInfo && listing.userRef !== userInfo._id && !contact && (
        <>
        
    <ChatButton userId={listing.userRef} />
    <button onClick={() => setContact(true)} className='bg-gradient-to-b  from-slate-500 via-slate-700 to-slate-900 text-white rounded-lg uppercase hover:opacity-95 p-3'>Send mail to landlord</button>
  </>
)}
              
              {contact && <Contact listing={listing} />}
            </div>        
        </div>
        }
    </main>
    </div>
  )
}


