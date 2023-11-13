import React from "react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// import ytLogo from "../images/yt-logo.png";
// import ytLogoMobile from "../images/yt-logo-mobile.png";
import logo from "../Assests/YouYube Logo.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const { mobileMenu, setMobileMenu, loading } = useContext(Context);
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      event?.key === "Enter" ||
      event === "searchButton" 
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("")
      setFocus(false)
    }
  };

  const mobileMenuHandler = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const page = pathname?.split("/")?.filter(Boolean)?.[0];

  return (
    <div className="sticky w-screen bg-black h-14 flex flex-row items-center justify-between px-6">
      <div className="flex items-center justify-center gap-1">
        {mobileMenu ? (
          <SlMenu
            className="block md:hidden lg:hidden text-white cursor-pointer"
            onClick={mobileMenuHandler}
          />
        ) : (
          <CgClose
            className="block md:hidden lg:hidden text-white cursor-pointer"
            onClick={mobileMenuHandler}
          />
        )}
        <Link to="/">
          <img src={logo} alt="logo" className="h-[7vh]" />
        </Link>
        <Link to="/">
          <span className="text-white text-2xl font-semibold lg:block hidden md:block">ProTube</span>
        </Link>
      </div>
      <div className={focus ? "flex justify-center items-center border-[1.5px] border-[#dbd6d6] rounded-3xl pl-5 transition-all duration-200" : "flex justify-center items-center border border-[#5d5b5b] rounded-3xl pl-5 transition-all duration-200"} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}>
        <input
          type="text"
          style={{
            all: "unset",
            color: "white",
            fontSize: ".7rem",
            width: "28vw",
          }}
          placeholder="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={searchQueryHandler}
          
        />
        <button className="bg-[#303030] h-full p-2 rounded-e-3xl" onClick={()=>searchQueryHandler("searchButton")}>
          <IoIosSearch className="text-white" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-3">
        <RiVideoAddLine className="text-white cursor-pointer lg:block hidden md:block"/>
        <FiBell className="text-white cursor-pointer lg:block hidden md:block"/>
        <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" className="h-[5vh] rounded-full cursor-pointer"/>
      </div>
    </div>
  );
};

export default Header;
