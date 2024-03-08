

import {React,useState,useEffect} from 'react'
import RightArrow from '../../assets/rightArrow.svg'
import {motion} from 'framer-motion'
import {Link } from 'react-router-dom'
import { logout } from '../../slices/adminAuthSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import 
{
    LayoutDashboard,
    UserCog,
    School,
    ImageIcon,

    
}
 from 'lucide-react'
import { useAdminLogoutMutation } from '../../slices/adminApiSlice'

const navLinks =[
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        path: '/adminDashboard',
    },
    {
        name: "UserManagement",
        icon:UserCog,
        path: '/adminDashboard/usermanagement',
    },
  
    // {
    //     name: "Property",
    //     icon:School,
    //     path: '/adminDashboard/property',
    // },
    {
        name: "Banner",
        icon:ImageIcon,
        path: '/adminDashboard/banner',
    },
    // {
    //     name:"Logout",
    //     path:'/adminDashboard/logout',
    // }
]

    const variants = {
        expanded: { width: "18%"},
        nonExpanded: {width: "5%"},
    }

function NavigationBar() {
    const [activeNavIndex,setAciveNavIndex] = useState(0);
    const [isExpanded,setIsExpanded] =  useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [AdminlogoutApiCall] = useAdminLogoutMutation()
        useEffect(() => {
            const currentPath = window.location.pathname;
            const currentIndex = navLinks.findIndex((item) => item.path === currentPath)
            if (currentIndex !== -1) {
                setAciveNavIndex(currentIndex);
              }
        },[]);

    const handleLogoutClick = async () => {
        try {
            await AdminlogoutApiCall().unwrap()
            dispatch(logout())
            navigate('/adminLogin')
        } catch (err) {
            console.log(err);
    }
}

  return (
  
    <motion.div animate={isExpanded ? "expanded" : "nonExpanded"}  variants={variants} className='logo-div  border border-r-2 border-cyan-700 w-1/5 h-screen rounded-r-lg relative bg-slate-500'>
       <div className='flex justify-between items-center max-w-6xl ml-3 bg-slate-500'>
    <h1 className="font-bold text-sm sm:text-xl flex items-center ">
      <img src="/logo3.png" alt="Logo" className="w-20 object-cover" />
      <span className=" bg-white inline-block  text-transparent bg-clip-text absolute top-0 left-14 m-4 ml-1 ">
        <span className= {isExpanded ? "block" : "hidden"} >PropertyScanner</span> 
      </span>
    </h1>
    </div>

    <div onClick={() => setIsExpanded(!isExpanded)} className='w-5 h-5 bg-[#000000] rounded-full absolute -right-[10.5px] top-6 flex items-center justify-center'>
        <img src={RightArrow} className='w-[5px]' />
    </div>

    <div className='mt-10 flex flex-col space-y-8 bg-slate-500'>
        {navLinks.map((item,index) => (
        <Link
         key = {index} to= {item.path} className={"flex space-x-3 p-2 rounded" + (isExpanded && index === activeNavIndex ? ' bg-[#000000] text-white font-semibold' : " ")}
            onClick={()=> setAciveNavIndex(index)}
        >
            <item.icon />
            <span  className= {isExpanded ? "block" : "hidden"}>{item?.name}</span>
            </Link>
            ))}
             <button onClick={handleLogoutClick} className="flex space-x-3 p-2 rounded bg-[#ffffff] text-black font-semibold ">
          Logout
        </button>
    </div>

    
       
    

    </motion.div>
    
  )
}

export default NavigationBar