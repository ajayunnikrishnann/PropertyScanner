import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const Layout = ({ children }) => {
  return (
    <div className="flex bg-gray-500">
      <NavigationBar />
      <main className="grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
