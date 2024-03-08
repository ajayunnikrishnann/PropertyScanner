import React from 'react';
import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-stretch">
      <Header />
      <div className="">
      <div className="py-20 px- </div> max-w-6xl mx-auto ">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">About Property Scanner</h1>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          Property Scanner is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. 
        </p>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
        Introducing our exclusive Boost Property Payment feature! Elevate your property listing to the top tier and ensure maximum visibility for potential buyers. With Boost Property Payment, sellers can prioritize their listings, giving them the advantage of higher visibility and increased chances of a swift sale. Don't miss out on the opportunity to showcase your property to a broader audience. Boost your property today and experience the enhanced visibility you deserve!
        </p>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
        Unlock the excitement of property acquisition with our cutting-edge Auction (Bidding) feature! Sellers can now showcase their properties in a thrilling auction format, inviting potential buyers to participate in a week-long bidding war. By placing your bid, you not only express your interest but also gain the exclusive opportunity to secure the property of your dreams.</p>
        <p>Here's how it works: Sellers initiate an auction, and buyers register by submitting their bidding amounts. After an exhilarating week of spirited competition, the highest bidder emerges as the fortunate winner, earning the right to acquire the property.
        </p>
      </div>
    </div>
    </div>
  );
}
