import React, { useState, useEffect, useRef } from "react";
import reparvLogo from "../assets/reparvLogo.svg";
import footerLogo from "../assets/footerLogo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserIcon from "../assets/user/UserIcon.svg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiMapPinAreaBold } from "react-icons/pi";
import ButtonWrap from "../assets/home/ButtonBack.svg";
import { TbArrowNarrowRightDashed } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";
import playStore from "../assets/playStore.png";
import appQR from "../assets/appQR.jpeg";
import { FaAppStoreIos } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FaCalculator } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import UserDropdown from "../components/UserDropdown";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const {
    URI,
    user,
    setShowLogin,
    selectedCity,
    setSelectedCity,
    showCitySelector,
    setShowCitySelector,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-bold text-[#5E23DC]" : "";
  };

  return (
    <div className="navbar z-30 fixed w-full h-15 sm:h-22 flex items-center justify-center bg-white shadow-[0px_2px_10px_0px_#00000026]">
      <div className="w-full max-w-[1440px] h-15 sm:h-22 px-8 lg:px-20 flex gap-5 items-center justify-between">
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              className="w-[100%] h-[100vh] fixed md:hidden top-0 right-0 z-10 flex justify-end bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => setShowSidebar(false)} // click backdrop to close
            >
              {/* Sidebar Panel */}
              <motion.div
                className="sidebar w-[90%] h-full max-w-[350px] min-w-[300px] bg-[#8A38F5] flex flex-col items-end gap-4 pb-[70px]"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                onClick={(e) => e.stopPropagation()} // prevent backdrop click
              >
                <div
                  style={{
                    borderImageSource:
                      "linear-gradient(90deg, #8A38F5 12.88%, #DABEFF 50%, #8A38F5 81.15%)",
                    borderImageSlice: 1,
                  }}
                  className="relative div w-full flex flex-col gap-2 items-center justify-center h-22 px-8 border-b"
                >
                  <Link to="/">
                    <img
                      src={footerLogo}
                      alt="reparv logo"
                      className="w-[120px]"
                    />
                  </Link>

                  {/* Back Button */}
                  <div
                    onClick={() => setShowSidebar(false)}
                    className="absolute left-[-18px] w-9 h-9 flex items-center justify-center cursor-pointer rounded-full text-[#5E23DC] bg-[#EEE1FF] border border-white"
                  >
                    <TbArrowNarrowRightDashed size={24} />
                  </div>
                </div>

                <div className="w-full h-screen flex flex-col items-center justify-between">
                  <div className="w-full flex flex-col gap-3 px-2 font-bold text-[white]">
                    {[
                      { to: "/", label: "Home" },
                      { to: "/properties", label: "Properties" },
                      { to: "/about-us", label: "About Us" },
                      { to: "/contact-us", label: "Contact Us" },
                      { to: "/blogs", label: "Blogs" },
                      { to: "/news", label: "News" },
                    ].map((item, index) => (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <NavLink
                          to={item.to}
                          onClick={() => setShowSidebar(false)}
                          className="w-full flex gap-2 items-center justify-between"
                        >
                          <div
                            className="w-full py-3 border-b rounded-xl"
                            style={{
                              borderImageSource:
                                "linear-gradient(90deg, #8A38F5 2.88%, #DABEFF 23.08%, #8A38F5 81.15%)",
                              borderImageSlice: 1,
                            }}
                          >
                            <span className="ml-4">{item.label}</span>
                          </div>
                          <FaChevronRight className="mr-4" />
                        </NavLink>
                      </motion.div>
                    ))}
                  </div>

                  {/* App Download Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-[90%] flex items-end justify-center gap-4 p-4 rounded-xl bg-white"
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xs font-semibold my-2">
                        Download Reparv App
                      </h2>

                      <div
                        onClick={() =>
                          window.open(
                            "https://play.google.com/store/apps/details?id=com.reparvcustomer",
                            "_blank",
                          )
                        }
                        className="flex gap-2 p-1 rounded-lg border cursor-pointer hover:scale-[1.02] transition"
                      >
                        <img src={playStore} alt="Play Store" className="h-8" />
                        <div className="flex flex-col justify-center pr-1">
                          <span className="text-[8px] text-gray-600">
                            Get it on
                          </span>
                          <h2 className="text-[10px] text-black font-semibold">
                            Google Play
                          </h2>
                        </div>
                      </div>

                      <div className="flex gap-2 p-1 rounded-lg border">
                        <FaAppStoreIos className="w-8 h-8 text-[#5323DC]" />
                        <div className="flex flex-col justify-center pr-1">
                          <span className="text-[8px] text-gray-600">
                            Get it on
                          </span>
                          <h2 className="text-[10px] text-black font-semibold">
                            Apple Store
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="w-[130px] h-[130px] rounded-xl">
                      <img
                        src={appQR}
                        alt="App QR Code"
                        className="w-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navbar */}
        <div className="w-full h-[70px] fixed md:hidden bottom-0 left-0 z-[9] bg-white flex items-center justify-evenly shadow-[3px_3px_3px_5px_#00000026]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <AiFillHome
                  size={24}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Home" : "Home"}</span>
                {/* Active indicator */}
                <div
                  className={`absolute bottom-0 w-[30px] h-[5px] rounded-tl-[6px] rounded-tr-[6px]
                   transition-all duration-300
                   ${isActive ? "bg-[#5E23DC] opacity-100" : "opacity-0"}
                  `}
                />
              </>
            )}
          </NavLink>

          {/* <NavLink 
            to="/trends"
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <FaArrowTrendUp
                  size={24}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Trends" : "Trends"}</span>
                
                <div
                  className={`absolute bottom-0 w-[30px] h-[5px] rounded-tl-[6px] rounded-tr-[6px]
                   transition-all duration-300
                   ${isActive ? "bg-[#5E23DC] opacity-100" : "opacity-0"}
                  `}
                />
              </>
            )}
          </NavLink> */}

          <NavLink
            to="/activities"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setShowLogin(true);
              } else {
                navigate("/activities");
              }
            }}
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <FaHistory
                  size={22}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Activities" : "Activities"}</span>
                {/* Active indicator */}
                <div
                  className={`absolute bottom-0 w-[30px] h-[5px] rounded-tl-[6px] rounded-tr-[6px]
                   transition-all duration-300
                   ${isActive ? "bg-[#5E23DC] opacity-100" : "opacity-0"}
                  `}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/emi-calculator"
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <FaCalculator
                  size={21}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Calculator" : "Calculator"}</span>
                {/* Active indicator */}
                <div
                  className={`absolute bottom-0 w-[30px] h-[5px] rounded-tl-[6px] rounded-tr-[6px]
                   transition-all duration-300
                   ${isActive ? "bg-[#5E23DC] opacity-100" : "opacity-0"}
                  `}
                />
              </>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                setShowLogin(true);
              } else {
                navigate("/profile");
              }
            }}
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <CgProfile
                  size={26}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Profile" : "Profile"}</span>
                {/* Active indicator */}
                <div
                  className={`absolute bottom-0 w-[30px] h-[5px] rounded-tl-[6px] rounded-tr-[6px]
                   transition-all duration-300
                   ${isActive ? "bg-[#5E23DC] opacity-100" : "opacity-0"}
                  `}
                />
              </>
            )}
          </NavLink>
        </div>

        {/* Desktop Navbar */}
        <div className="flex items-center justify-end">
          <Link to="/">
            <img
              src={reparvLogo}
              alt="reparv logo"
              className="w-[90px] md:w-[120px] lg:w-[135px]"
            />
          </Link>
        </div>

        {/* City Selector  */}
        <div
          onClick={() => {
            setShowCitySelector(true);
            //navigate("/properties");
          }}
          className={`selectCity min-w-[50px] max-w-[210px] relative py-2 rounded-lg px-4 cursor-pointer`}
        >
          <div className="flex lg:gap-1 items-center justify-center text-xs sm:text-base font-bold text-[#5E23DC] lg:p-1 ">
            <PiMapPinAreaBold className="w-4 h-4 sm:w-6 sm:h-6 mr-1" />
            <span className="block whitespace-nowrap font-bold text-[#5E23DC] ">
              {selectedCity
                ? selectedCity.length > 12
                  ? `${selectedCity.slice(0, 11)}...`
                  : selectedCity
                : "Select City"}
            </span>
            <RiArrowDropDownLine className="w-5 h-5 sm:w-6 sm:h-6 text-[#5E23DC]" />
          </div>
        </div>

        <div className="menu flex items-center justify-between md:hidden">
          <IoMdMenu
            onClick={() => {
              setShowSidebar(true);
            }}
            className="w-7 h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>

        <div className="navlink hidden md:flex items-center justify-start gap-5 lg:gap-6 xl:gap-9 2xl:gap-12 text-md font-semibold xl:text-base leading-[30px] tracking-[1px] lg:tracking-[0.1em] text-[#110229]">
          <NavLink to="/" className={`${getNavLinkClass("/")}`}>
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={`${getNavLinkClass("/properties")} flex gap-1`}
          >
            Properties
          </NavLink>

          <NavLink
            to="/about-us"
            className={`${getNavLinkClass("/about-us")} hidden xl:flex gap-1 `}
          >
            About Us
          </NavLink>

          <NavLink
            to="/contact-us"
            className={`${getNavLinkClass(
              "/contact-us",
            )} hidden xl:flex gap-1 `}
          >
            Contact Us
          </NavLink>

          <div className="relative min-w-45 flex items-center justify-center p-4">
            <img src={ButtonWrap} alt="Button" className="absolute w-full" />
            <div
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.reparvcustomer",
                  "_blank",
                );
                setShowSidebar(false);
              }}
              className="px-4 py-2 z-10 flex items-center justify-center cursor-pointer text-sm font-medium text-white bg-[#8A38F5] rounded-full hover:opacity-90 transition active:scale-98"
            >
              Download App
            </div>
          </div>

          <UserDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
