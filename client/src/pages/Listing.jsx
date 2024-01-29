import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header';
import {Swiper , SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
export default  function Listing() {
    SwiperCore.use([Navigation]);
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(false)
    const params= useParams();
    useEffect(()=>{
        const fetchListing = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)

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
    
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}

        {listing && !loading && !error && 
        <div className='absolute inset-0 shadow-md'> 
        <Swiper navigation>
            {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
                <div
                 className='h-[400px] '
                  style={{background: `url(${url}) center 
                  no-repeat`, backgroundSize: 'cover'  }}>

                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </div>
        

        
        }
    </main>
    </div>
  )
}

