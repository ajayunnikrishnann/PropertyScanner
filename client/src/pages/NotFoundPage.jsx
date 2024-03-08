import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen overflow-hidden bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200">
      <div className="flex flex-col items-center justify-center">
        {/* Uncomment the following lines if you have an image to display */}
        {/* <img
          src="/demo/images/notfound/logo-blue.svg"
          alt="Sakai logo"
          className="mb-5 w-6rem flex-shrink-0"
        /> */}
        <div className="rounded-full p-1" style={{ background: 'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)' }}>
          <div className="w-full bg-white py-8 px-5 sm:px-8 flex flex-col items-center rounded-3xl">
            <span className="text-blue-500 font-bold text-3xl">404</span>
            <h1 className="text-900 font-bold text-5xl mb-2">Not Found</h1>
            <div className="text-600 mb-5">
              Requested Page is not available
            </div>
            {/* You can add a Link or button to navigate to a specific page */}
            <Link to="/" className="text-blue-600 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
