import React from 'react'
import Header from '../components/Header'

function Search() {
    
  return (
    <div className="min-h-screen flex flex-col items-stretch ">
    <Header /> 
    <div className="absolute inset-0  ">
    <div className=''>
        <div className='w-full h-98 object-cover flex items-center justify-center' style={{ backgroundImage: "url('/bannerrrr.jpg')" , backgroundSize: 'cover',    backgroundPosition: 'center',}}>
    <div className='pt-40  md:min-h-96 '>
        <form className=' flex flex-row bg-black bg-opacity-80 gap-2 border-2 border-slate-100 rounded-lg  p-4  '>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap text-white'></label>
                <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-56'/>
            </div>
            <div className='flex gap-4 flex-wrap items-center text-white'>
                <label className='text-cyan-800 font-semibold'></label>
                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='all' className='w-5 items-center justify-center ' />
                    <span>Rent & Sale</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='rent' className='w-5 items-center justify-center ' />
                    <span>Rent</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='sale' className='w-5 items-center justify-center ' />
                    <span>Sale</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='offer' className='w-5 items-center justify-center ' />
                    <span>Offer</span>
                </div>
            </div>

            <div className='flex gap-4 flex-wrap items-center text-white'>
                <label className='text-cyan-800 font-semibold'></label>
                <div className='flex gap-2 items-center '>
                    <input type='checkbox' id='parking' className='w-5 items-center justify-center' />
                    <span>Parking</span>
                </div>

                <div className='flex gap-2 items-center '>
                    <input type='checkbox' id='furnished' className='w-5 items-center justify-center' />
                    <span>Furnished</span>
                </div>
            </div>
            <div className='flex items-center  gap-2 '> 
                <label></label>
                <select id='sort_order' className='border rounded-lg p-3'>
                    <option >Price high to low</option>
                    <option >Price low to high</option>
                    <option >Latest</option>
                    <option >Oldest</option>
                </select>
            </div>
            <button className=' bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900 text-white p-3 rounded-lg uppercase hover:opacity-95 w-48'>Search</button>
         </form>
         </div>
         </div>
    </div>
    <div className=''>
    <h1 className='text-2xl font-semibold   text-slate-700 '>Listing Results</h1>
    </div>
    </div>
    </div>
  )
}

export default Search
