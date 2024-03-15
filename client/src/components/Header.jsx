import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useState, useEffect } from "react";
// import { MdChatBubble } from 'react-icons/md';
import { BsChatDots } from "react-icons/bs";
import { Dropdown } from "flowbite-react";
// import { BsThreeDotsVertical } from "react-icons/bs";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");

  const [username, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username);
    }
  }, [userInfo]);

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="sticky top-4 z-[20] mx-auto bg-gradient-to-b  from-cyan-500 via-cyan-700 to-cyan-900 flex items-center justify-between w-11/12 h-12 bg-slate-300  shadow-md py-6 px-6 rounded-lg">

    <div>
      <div className="flex justify-between items-center max-w-6xl ">
        <Link to="/">
          <img
            src="Property_Scanner__5_-removebg-preview.png"
            alt="Logo"
            className="hidden md:block w-20 object-cover lg:w-60 lg:pt-10 sm:w-32 sm:pt-2 sm:h-40 sm:pl-0"
          />
          <img
            src="logo3.png"
            alt="Logo"
            className="h-16 pb-2 hidden sm:block md:hidden"
          />
          <img src="logo5.png" alt="Logo" className="h-16 pb-2 sm:hidden" />
        </Link>
      </div>
    </div>
    <div className="pt-1 ">
      <form
        onSubmit={handleSubmit}
        className="bg-cyan-700   rounded-lg pr-4 flex items-center"
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-1 sm:w-36 h-6 pl-2  placeholder:text-black border-none focus:border-none focus:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className="text-black " />
        </button>
      </form>
    </div>
    <div className="flex items-center">

      <div className="">
        <Dropdown
          label="Buyers/Owners"
          style={{
            height: "20px",
            position: "relative",
            top: "9px",
            background: "none",
            outline: "none",
          }}
          className="w-44   bg-slate-300 bg-opacity-75 text-white font-semibold flex items-center justify-center"
        >
          <Link to="/createListing" className="relative">
            <Dropdown.Item>Post Property</Dropdown.Item>
          </Link>
          <Link to="/auctionListing" className="relative">
            <Dropdown.Item>Create Auction Listing</Dropdown.Item>
          </Link>
          <Link to="/listingsAuction" className="relative">
            <Dropdown.Item>Show Auction Listings</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Link to="/about" className="relative">
            <Dropdown.Item>About</Dropdown.Item>
          </Link>
        </Dropdown>
      </div>

      <div className="md:hidden">
        <Dropdown
          label="☰"
          style={{
            height: "20px",
            position: "relative",
            top: "4px",
            left: "26px",
            background: "none",
            outline: "none",
          }}
          className="w-44 bg-slate-300 bg-opacity-75 text-white font-semibold flex items-center justify-center"
        >
          <Link to="/chat" className="relative">
            <Dropdown.Item>
              <BsChatDots className="mr-2" size={28} />
              Chat
            </Dropdown.Item>
          </Link>
          <Link to="/" className="relative">
            <Dropdown.Item>Home</Dropdown.Item>
          </Link>
          {userInfo ? (
            <>
              <Link to="/profile" className="relative">
                <Dropdown.Item>{username}</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Link to="" className="relative">
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="relative">
                <Dropdown.Item>Sign In</Dropdown.Item>
              </Link>
            </>
          )}
        </Dropdown>
      </div>
      <ul className="gap-5 mt-6 hidden md:flex">
        <Link to="/chat">
          <button className=" text-nowrap  text-black hover:text-slate-700 pl-2 ">
            <BsChatDots className="mr-2" size={28} />{" "}
            {/* Adjust the size as needed */}
          </button>
        </Link>

        <Link to="/">
          <li className="hidden sm:inline font-bold  text-slate-950 hover:text-white  ">
            Home
          </li>
        </Link>
        {userInfo ? (
          <>
            <Link to="/profile">
              <li className="font-bold text-slate-950 hover:text-white cursor-pointer">
                {username}
              </li>
            </Link>
            <li
              className="font-bold text-slate-950 hover:text-white cursor-pointer"
              onClick={logoutHandler}
            >
              Logout
            </li>
          </>
        ) : (
          <Link to="/sign-in">
            <li className=" font-bold  text-slate-950 hover:text-white">
              SignIn
            </li>
          </Link>
        )}
      </ul>
    </div>
    </header>
  );
}

export default Header;
