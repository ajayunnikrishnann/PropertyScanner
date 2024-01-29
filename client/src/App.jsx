import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Layout from "./components/admin/Layout";

import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/ForgotPassword";
import Verifyotp from "./pages/verifyotp";
import UserChangePassword from "./pages/UserChangePassword";
import UserProfile from "./pages/userProfile";
import CreateListing from "./pages/CreateListing";
import AdminLogin from "./pages/admin/adminlogin";
import AdminDashBoardLayout from "./components/admin/AdminDashBoardLayout";
import NavigationBar from "./components/admin/NavigationBar";
import UserManagement from "./components/admin/UserManagement";
import PrivateRoute from "./components/PrivateRoute";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";

export default function App() {
  return (
    <BrowserRouter>
      
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/changePassword" element={<UserChangePassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />

          <Route element={<PrivateRoute />}>
          <Route path="/createListing" element={<CreateListing />} />
          <Route path="/updateListing/:listingId" element={<UpdateListing />} />
          </Route>


          {/* Admin Routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path= "/adminDashboard/*" element={<AdminDashBoardLayout />}/>
          <Route path="/Admin/Users" element={<UserManagement  />} />

        </Routes>
      
    </BrowserRouter>
  );
}

    
