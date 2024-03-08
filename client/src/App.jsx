import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Layout from "./components/admin/Layout";
import { ChakraProvider } from '@chakra-ui/react'
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
import Search from "./pages/Search";
import Success from "./components/CheckoutSuccess";
import Cancel from "./components/Cancel";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Otp from "./pages/Otp";
import ChatProvider from "./components/context/ChatProvider";
import ChatScreen from "./pages/ChatScreen";
import AuctionCreateListing from "./pages/AuctionCreateListing";
import AuctionListings from "./pages/AuctionListings";
import ListingsFeaturingAuction from "./pages/ListingsFeaturingAuction";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    
    <BrowserRouter>
      <ChatProvider>
      <ChakraProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otpVerify" element={<Otp />} />

          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<Verifyotp />} />
          <Route path="/changePassword" element={<UserChangePassword />} />
       
          <Route path="/about" element={<About />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="/search" element={<Search />} />

          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/createListing" element={<CreateListing />} />
          <Route path="/updateListing/:listingId" element={<UpdateListing />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />}/>
          <Route path="/cancel" element={<Cancel />}/>
          <Route path="/chat" element={<ChatScreen />}/>
          <Route path="/auctionListing" element={<AuctionCreateListing />}/>
          <Route path="/listingsAuction" element={<AuctionListings />}/>
          <Route path="/listingFeatureAuction/:listingId" element={<ListingsFeaturingAuction />}/>

          </Route>


          {/* Admin Routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path= "/adminDashboard/*" element={<AdminDashBoardLayout />}/>
          <Route path="/Admin/Users" element={<UserManagement  />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </ChakraProvider>
        </ChatProvider>
    </BrowserRouter>
    
  );
}

    
