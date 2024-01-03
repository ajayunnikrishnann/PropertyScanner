import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from '../pages/Modal'
import { useState } from 'react'


function Header() {
  const [showSignUp,setShowSignUp] = useState(false)
  
  const handleOnClose = ()=> setShowSignUp(false)
  
  return (
    <header className="flex items-center justify-between h-12 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-md py-6 px-6">
    <div className='flex justify-between items-center max-w-6xl '>
      <Link to='/'>
    <h1 className="font-bold text-sm sm:text-xl flex items-center">
      <img src="/logo3.png" alt="Logo" className="w-20 object-cover" />
      <span className="ml-4">
        <span className="bg-gradient-to-r from-green-400 via-green-600 to-green-800 inline-block text-transparent bg-clip-text absolute top-0 left-14 m-4">PropertyScanner</span> 
      </span>
    </h1>
    </Link>
    </div>
    <div className='flex justify-between items-center max-w-6xl '>
    <form className='bg-slate-100  p-1  rounded-tl-xl flex items-center'>
      <input type='text' placeholder='Search...' className='bg-transparent pl-2 focus:outline-none w-24 sm:w-64 '/>
      <FaSearch className='text-slate-950'/>
    </form>
    </div>
    <ul className='flex gap-4'>
      <Link to='/'>
      <li className='hidden sm:inline font-bold  text-slate-950 hover:text-white'>Home</li>
      </Link>

      <Link to='/about'>
      <li className='hidden sm:inline font-bold  text-slate-950 hover:text-white'>About</li>
      </Link>

      <Link to='/sign-in'>
      <li className=' font-bold  text-slate-950 hover:text-white'>SignIn</li>
      </Link>

      <Link >
      <li onClick={() => { setShowSignUp(true);}}  className=' font-bold  text-slate-950 hover:text-white'>SignUp</li>
      </Link>

    <Modal onClose={handleOnClose} visible={showSignUp} />
    
      
    </ul>
  </header>
  )
}

export default Header