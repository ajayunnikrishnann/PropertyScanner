import React from "react";

const Pagination = ({ currentPage, handlePageClick, totalPages, setCurrentPage }) => {

  const renderPage = (pageNumber, isActive = false) => {
    const className = `w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${isActive ? "bg-dark-1 text-white" : ""}`;
    return (
      <div key={pageNumber} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </div>
      </div>
    );
  };

  const renderPages = (totalPages) => {
    const totalPage = totalPages;
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
    const pages = (
      <div className="flex gap-4">
        {pageNumbers.map((pageNumber) => renderPage(pageNumber, pageNumber === currentPage))}
      </div>
    );
    return pages;
  };

  return (
    <div className="border-t border-gray-300 mt-8 pt-8">
      <div className="flex flex-wrap gap-x-4 gap-y-4 justify-between md:justify-center">
        <div className="order-1">
          <button className="bg-blue-500 text-white w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center" onClick={() => setCurrentPage(currentPage - 1)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
    </svg>
            
            {/* <i className="icon-chevron-left text-xs" /> */}
          </button>
        </div>

        <div className="order-3">
          <div className="flex gap-4">
            {renderPages(totalPages)}
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="text-sm text-gray-600">
              {/* {currentPage} – {totalPages} */}
            </div>
          </div>
        </div>

        <div className="order-2">
          <button className="bg-blue-500 text-white w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center" onClick={() => setCurrentPage(currentPage + 1)}>
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
           
            {/* <i className="icon-chevron-right text-xs" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
