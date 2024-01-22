import React from 'react'
import Header from '../components/Header'

export default function CreateListing() {
  return (
    <div className="h-screen overflow bg-cover bg-center bg-opacity-50 " style={{ backgroundImage: "url('public/bg1.jpg')" }}>
    <Header />
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form  className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg  bg-black bg-opacity-35 placeholder:text-white' id='name' maxLength='62' minLength='10' required/>
          <textarea type="text" placeholder='Description' className='border p-3 rounded-lg bg-black bg-opacity-35 placeholder:text-white' id='description' required/>
          <input type='text' placeholder='Address' className='border p-3 rounded-lg bg-black bg-opacity-35 placeholder:text-white' id='address' required/>
        <div className='flex gap-3 flex-wrap'>
          <div className='flex gap-2 items-center '>
            <input type='checkbox' id='sale' className='w-5 bg-black bg-opacity-35 ' />
            <span>Sell</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='rent' className='w-5 bg-black bg-opacity-35 ' />
            <span>Rent</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='parking' className='w-5 bg-black bg-opacity-35 ' />
            <span>Parking spot</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='furnished' className='w-5 bg-black bg-opacity-35 ' />
            <span>Furnished</span>
          </div>
          <div className='flex gap-2 items-center'>
            <input type='checkbox' id='offer' className='w-5 bg-black bg-opacity-35 ' />
            <span>Offer</span>
          </div>
        </div>
        <div className='flex flex-wrap flex-row gap-6'>
          <div className='flex  items-center gap-2'>
            <input type='number' id='bedrooms' min='1' max='10' required className='p-1 border border-gray-300 rounded-lg bg-black bg-opacity-35 '/>

            <p>Beds</p>
          </div>

          <div className='flex items-center gap-2'>
            <input type='number' id='bathrooms' min='1' max='10' required className='p-1 border border-gray-300 rounded-lg bg-black bg-opacity-35 '/>

            <p>Baths</p>
          </div>

          <div className='flex items-center gap-2'>
            <input type='number' id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg bg-black bg-opacity-35 '/>
              <div className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>(₹ / month)</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <input type='number' id='discountedPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg bg-black bg-opacity-35 '/>
            <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            <span className='text-xs'>(₹ / month)</span>
            </div>
          </div>
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input className='p-2  border  border-cyan-950 rounded w-full bg-black bg-opacity-35 ' type='file' id='images' accept='image/*' multiple/>
            <button className='p-2 text-green-700 font-semibold border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 bg-white  '>Upload</button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>       
      </form>
    </main>
    </div>
  )
}

