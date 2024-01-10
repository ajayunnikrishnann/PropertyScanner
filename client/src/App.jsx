import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassword from "./pages/ForgotPassword";
import Verifyotp from "./pages/verifyotp";
import UserChangePassword from "./pages/UserChangePassword";
import UserProfile from "./pages/userProfile";

export default  function App() {
  return (


    
  <BrowserRouter>
  <Header />
  <ToastContainer />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotPassword" element={<ForgotPassword />} />
    <Route path="/verifyotp" element={<Verifyotp />} />
    <Route path="/changePassword" element={<UserChangePassword/>} />
    <Route path="/profile" element={<UserProfile/>} />
  
    
    <Route path="/about" element={<About />} />
    
   



       {/* --------------------Admin Routes----------------------------------------- */}
      

  </Routes>
  </BrowserRouter>
  )
}

