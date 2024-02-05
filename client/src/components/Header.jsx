import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { useState, useEffect } from 'react'



function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector((state) => state.auth)
  const [searchTerm, setSearchTerm] = useState('')

  const [username,setUserName] = useState('')



  useEffect(()=>{
    if(userInfo){
    
      setUserName(userInfo.username)
    }
  },[userInfo])
  

  const [logoutApiCall] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    }catch (err){
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  useEffect( () => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
       setSearchTerm(searchTermFromUrl);
    }
  },[location.search] )
  return (
    
    <header className="sticky top-3 z-50 ml-3 mr-3 bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900 flex items-center justify-between h-12 bg-slate-300  shadow-md py-6 px-6 rounded-lg">
    <div className='flex justify-between items-center max-w-6xl '>
      <Link to='/'>
    <h1 className="font-bold text-sm sm:text-xl flex items-center">
      <img src="/logo3.png" alt="Logo" className="w-20 object-cover" />
      <span className="ml-4">
        <span className="bg-white font-bold to-slate-200 inline-block text-transparent bg-clip-text absolute top-0 left-14 m-4 text-stroke" style={{ WebkitTextStroke: '0.25px ', textStroke: '0.25px ' }}>PropertyScanner</span> 
      </span>
    </h1>
    </Link>
    </div>
    <div className='pl-52'>
    <form onSubmit={handleSubmit} className='bg-cyan-700   rounded-lg flex items-center'>
        
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-1 sm:w-36 h-6 pl-2  placeholder:text-black border-none focus:border-none focus:ring-0'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
          <button>
            <FaSearch className='text-black ' />
          </button>
        </form>
        </div>
    {/* <div className='flex justify-between items-center max-w-6xl '>
    <form className='bg-cyan-700 bg-opacity-50 p-1  rounded-lg flex items-center'>
      <input type='text' placeholder='Search...' className='bg-transparent pl-2 focus:outline-none w-24 sm:w-64 placeholder:text-black'/>
      <FaSearch className='text-slate-950'/>
    </form>
    </div>  */}
    <ul className='flex gap-4'>
      <Link to='/createListing'>
      <button className='hidden sm:inline font-bold bg-cyan-700 rounded-lg text-black hover:text-white pl-2 pr-2'>+Post Your Property</button>
      </Link>
      <Link to='/'>
      <li className='hidden sm:inline font-bold  text-slate-950 hover:text-white  '>Home</li>
      </Link>

      <Link to='/about'>
      <li className='hidden sm:inline font-bold  text-slate-950 hover:text-white'>About</li>
      </Link>


      {userInfo ? (
        <>
        <Link to='/profile'>
        <li className="font-bold text-slate-950 hover:text-white cursor-pointer">{username}</li>
        </Link>
            <li className="font-bold text-slate-950 hover:text-white cursor-pointer" onClick={logoutHandler}>
              Logout
            </li>
        </>
      ) :(
        <Link to='/sign-in'>
        <li className=' font-bold  text-slate-950 hover:text-white'>SignIn</li>
        </Link>
      )}
     
       
   
    
     
    </ul>
  </header>
  
  )
}

export default Header