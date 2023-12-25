import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <header className="flex items-center justify-between h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 shadow-md py-6 px-6">
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
    </ul>
  </header>
  )
}

export default Header