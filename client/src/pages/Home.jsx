import React, { useEffect, useState } from "react";
import { useGetUserBannerQuery } from "../slices/usersApiSlice";
import Header from "../components/Header";

const Home = () => {
  const { data: banners, isLoading, isError } = useGetUserBannerQuery();

  if (isLoading) {
    return <div>Loading banners...</div>;
  }

  return (
  
    <div className="min-h-screen flex flex-col items-stretch">
    <Header /> 
    <div className="absolute inset-0 ">
      <img src={banners.image} alt="Banner" className="w-full h-98 object-cover  " />
    </div>
  </div>
 )  
  }
export default Home;