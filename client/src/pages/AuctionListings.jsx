import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AuctionListingItem from '../components/AuctionListingitem';

const AuctionListings = () => {
  const [auctionListings, setAuctionListings] = useState([]);

  useEffect(() => {
    // Fetch your listings data from an API endpoint or any other source
    // and set the state with the data.
    const fetchData = async () => {
      try {
        const res = await fetch('/api/listing/auction-listings'); // Replace with your API endpoint
        const data = await res.json();

        // Log the data to understand its structure
        console.log('Data received:', data);

        // Check if data is an array before applying filter
        if (Array.isArray(data)) {
          setAuctionListings(data.filter(listing => listing.isAuction));
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching auction listings:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-stretch">
      <Header />
      <main className="flex flex-wrap gap-6 mb-6 pt-6 pl-10">
        {auctionListings.map((listing) => (
          <AuctionListingItem key={listing._id} listing={listing} />
        ))}
      </main>
    </div>
  );
};

export default AuctionListings;
