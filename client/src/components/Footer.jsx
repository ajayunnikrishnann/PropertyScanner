import React from 'react'

const Footer = () => {
  return (
    <footer className='relative bg-gradient-to-r  from-cyan-950 via-cyan-900 to-cyan-950 text-white h-80 '>
    <div className="absolute bg-gradient-to-r  from-cyan-950 via-cyan-900 to-cyan-950 left-0 w-[100%] overflow-hidden  ">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="relative block fill-white"></path>
    </svg>
    <div className='flex'>
        <div className='flex '>
        <h1 className="">
      <img src="/logo3.png" alt="Logo" className="w-20 h-10  object-cover" />
      <h1 className='font-bold '>PropertyScanner</h1>
   
      <nav className="md:place-self-center md:justify-self-end justify-center pl-96">
      <div className="grid grid-flow-col ">
  <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
  <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
  <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
</div>
  </nav>
      <h3 className='font-semibold text-zinc-200 pt-10 pl-44 justify-center items-center'>PropertyScanner invites you to embark on a journey of discovery, where finding your dream home becomes an effortless exploration.</h3>
    
    </h1>
        </div>
       
    </div>
    <div className="text-center pt-16">
        <p className="text-white text-sm">© 2024 PropertyScanner. All rights reserved.</p>
        <div className="flex  justify-end mt-2">
          <a href="" className="text-white text-sm mr-4">About us</a>
          <a href="" className="text-white text-sm mr-4">Contact</a>
          <a href="" className="text-white text-sm mr-4">Terms of Use</a>
          <a href="" className="text-white text-sm mr-4">Cookie Policy</a>
          <a href="" className="text-white text-sm mr-4">Privacy Policy</a>
         
        </div>
      </div>
      
    </div>
    
    </footer>
  )
}

export default Footer
