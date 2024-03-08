
import { Link } from "react-router-dom"
import React from "react"
const CheckoutSuccess = () => {
  return (
    
    <div className="bg-gray-100 h-screen rounded-lg flex items-center justify-center">
    <div className="bg-white p-6 mx-auto max-w-md text-center">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
        </svg>
        <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Payment Done!</h3>
            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p className="text-gray-600">Have a great day!</p>
            <div className="py-6">
            <Link to='/'>
                <h4 href="#" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg">BACK to Home page</h4>
            </Link>
            </div>
        </div>
    </div>
</div>

  )
}

export default CheckoutSuccess
