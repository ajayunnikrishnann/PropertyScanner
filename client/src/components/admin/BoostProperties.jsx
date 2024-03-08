import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const BoostProperties = () => {
  const [boostedListings, setBoostedListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const listingsPerPage = 5;

  useEffect(() => {
    const fetchBoostedListings = async () => {
      try {
        const response = await fetch(`/api/admin/boosted-listings?page=${pageNumber + 1}`);
        const data = await response.json();

        if (response.ok) {
          setBoostedListings(data);
        } else {
          console.error('Failed to fetch boosted listings:', response.status);
        }
      } catch (error) {
        console.error('Error fetching boosted listings:', error.message);
      }
    };

    fetchBoostedListings();
  }, [pageNumber]);

  const handlePageChange = (selected) => {
    setPageNumber(selected.selected);
  };

  return (
    <div>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border bg-gray-100 p-2">Username</th>
            <th className="border bg-gray-100 p-2">Property Name</th>
            <th className="border bg-gray-100 p-2">Expires On</th>
            <th className="border bg-gray-100 p-2">Amount</th>
            
          </tr>
        </thead>
        <tbody>
          {boostedListings.slice(pageNumber * listingsPerPage, (pageNumber + 1) * listingsPerPage).map((boostedListing) => (
            <tr key={boostedListing._id}>
              <td className="border p-2 ">{boostedListing.userRef.username}</td>
              <td className="border p-2 ">{boostedListing.name}</td>
              <td className="border p-2">{new Date(boostedListing.expiresOn).toLocaleString()}</td>
              <td className="border p-2">500</td>
              
            </tr>
          ))}
        </tbody>
      </table>

   
    </div>
       <ReactPaginate
       previousLabel={'previous'}
       nextLabel={'next'}
       breakLabel={'...'}
       pageCount={10} 
       marginPagesDisplayed={2}
       pageRangeDisplayed={5}
       onPageChange={handlePageChange}
       containerClassName={'pagination flex justify-center mt-4'}
       previousLinkClassName={'bg-blue-500 text-white py-2 px-4 rounded-l'}
       nextLinkClassName={'bg-blue-500 text-white py-2 px-4 rounded-r'}
       pageClassName={'mx-2'}
       activeClassName={'active'}
     />
     </div>
  );
};

export default BoostProperties;
