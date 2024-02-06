import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate()
    const [sidebardata,setSidebardata] = useState({
        searchTerm: '',
        type:'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })

    const [loading, setLoading] = useState(false)
    const [listings,setListings] = useState([])
   console.log(listings);
useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type')
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if(
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
    ){
        setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
        })
    }
    const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data)
        setLoading(false)

    }
  
    fetchListings()
  },[location.search])

 

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({...sidebardata, type: e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata,searchTerm: e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({...sidebardata,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at' ;
            const order = e.target.value.split('_')[1] || 'desc' ;
            setSidebardata({...sidebardata, sort, order})
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm',sidebardata.searchTerm)
        urlParams.set('type',sidebardata.type)
        urlParams.set('parking',sidebardata.parking)
        urlParams.set('furnished',sidebardata.furnished)
        urlParams.set('offer',sidebardata.offer)
        urlParams.set('order',sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

  return (
    <div className="min-h-screen flex flex-col items-stretch ">
    <Header /> 
    <div className="absolute inset-0  ">
    <div className=''>
        <div className='w-full h-96 object-cover flex items-center justify-center' style={{ backgroundImage: "url('/bannerrrr.jpg')" , backgroundSize: 'cover',    backgroundPosition: 'center',}}>
    <div className='pt-72  md:min-h-96 '>
        <form onSubmit = {handleSubmit} className=' flex flex-row bg-black bg-opacity-50 gap-2 border-2 border-slate-100 rounded-lg  p-4  '>
            <div className='flex items-center gap-2 '>
                <label className='whitespace-nowrap text-white'></label>
                <input type='text' id='searchTerm' placeholder='Search...' value={sidebardata.searchTerm} onChange={handleChange} className='border rounded-lg p-3 w-56'/>
            </div>
            <div className='flex gap-4 flex-wrap items-center text-white'>
                <label className='text-cyan-800 font-semibold'></label>
                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='all' onChange={handleChange} checked={sidebardata.type === 'all'} className='w-5 items-center justify-center ' />
                    <span>Rent & Sale</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='rent' onChange={handleChange} checked={sidebardata.type === 'rent'} className='w-5 items-center justify-center ' />
                    <span>Rent</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='sale' onChange={handleChange} checked={sidebardata.type === 'sale'} className='w-5 items-center justify-center ' />
                    <span>Sale</span>
                </div>

                <div className='flex flex-col gap-1 items-center '>
                    <input type='checkbox' id='offer' onChange={handleChange} checked={sidebardata.offer} className='w-5 items-center justify-center ' />
                    <span>Offer</span>
                </div>
            </div>

            <div className='flex gap-4 flex-wrap items-center text-white'>
                <label className='text-cyan-800 font-semibold'></label>
                <div className='flex gap-2 items-center '>
                    <input type='checkbox' id='parking'  onChange={handleChange} checked={sidebardata.parking} className='w-5 items-center justify-center' />
                    <span>Parking</span>
                </div>

                <div className='flex gap-2 items-center '>
                    <input type='checkbox' id='furnished'  onChange={handleChange} checked={sidebardata.furnished} className='w-5 items-center justify-center' />
                    <span>Furnished</span>
                </div>
            </div>
            <div className='flex items-center   gap-2 '> 
                <label></label>
                <select  onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3 appearance-none'>
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value='createdAt_desc'>Latest</option>
                    <option value='createdAt_asc'>Oldest</option>
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
