"use client";

import Link from "next/link";
import NavLink from "../components/NavLinkNext.jsx";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../store/auth";
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiBuildingOfficeFill, PiMapPinAreaBold } from "react-icons/pi";
import { TbArrowNarrowRightDashed } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";
import { FaAppStoreIos, FaHistory, FaCalculator } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import UserDropdown from "../components/UserDropdown";
import { motion, AnimatePresence } from "framer-motion";

const PARTNERS_URL = "https://partners.reparv.in/";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.reparvcustomer";

const DESKTOP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about-us", label: "About Us", className: "hidden xl:flex" },
  { href: "/contact-us", label: "Contact Us", className: "hidden xl:flex" },
];

const SIDEBAR_LINKS = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about-us", label: "About Us" },
  { to: "/contact-us", label: "Contact Us" },
  { to: "/blogs", label: "Blogs" },
  { to: "/news", label: "News" },
  { to: PARTNERS_URL, label: "Partners", external: true },
];

const SIDEBAR_BORDER_STYLE = {
  borderImageSource:
    "linear-gradient(90deg, #8A38F5 2.88%, #DABEFF 23.08%, #8A38F5 81.15%)",
  borderImageSlice: 1,
};

function Navbar() {
  const { user, setShowLogin, selectedCity, setShowCitySelector } = useAuth();

  const [showSidebar, setShowSidebar] = useState(false);

  // Let NavLink handle navigation; only intercept to ask guests to log in.
  const requireLogin = (e) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  return (
    <div className="navbar z-30 fixed w-full h-15 sm:h-22 flex items-center justify-center bg-white shadow-[0px_2px_10px_0px_#00000026]">
      <div className="w-full max-w-[1440px] h-15 sm:h-22 px-8 lg:px-10 2xl:px-20 flex gap-5 items-center justify-between">
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
                  <Link href="/">
                    <img
                      src="/assets/reparvLogo.svg"
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
                    {SIDEBAR_LINKS.map((item, index) => {
                      const content = (
                        <>
                          <div
                            className="w-full py-3 border-b rounded-xl"
                            style={SIDEBAR_BORDER_STYLE}
                          >
                            <span className="ml-4">{item.label}</span>
                          </div>
                          {item.external ? (
                            <FiExternalLink className="mr-4 shrink-0" />
                          ) : (
                            <FaChevronRight className="mr-4 shrink-0" />
                          )}
                        </>
                      );
                      const linkClass =
                        "w-full flex gap-2 items-center justify-between";

                      return (
                        <motion.div
                          key={item.to}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                        >
                          {item.external ? (
                            <a
                              href={item.to}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setShowSidebar(false)}
                              className={linkClass}
                            >
                              {content}
                            </a>
                          ) : (
                            <NavLink
                              href={item.to}
                              onClick={() => setShowSidebar(false)}
                              className={({ isActive }) =>
                                `${linkClass} ${isActive ? "text-[#FFE27A]" : ""}`
                              }
                            >
                              {content}
                            </NavLink>
                          )}
                        </motion.div>
                      );
                    })}
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

                      <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-2 p-1 rounded-lg border cursor-pointer hover:scale-[1.02] transition"
                      >
                        <img
                          src="/assets/playStore.png"
                          alt="Play Store"
                          className="h-8"
                        />
                        <div className="flex flex-col justify-center pr-1">
                          <span className="text-[8px] text-gray-600">
                            Get it on
                          </span>
                          <h2 className="text-[10px] text-black font-semibold">
                            Google Play
                          </h2>
                        </div>
                      </a>

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
                        src="/assets/appQR.jpeg"
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
            href="/"
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
            href="/trends"
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
            href="/activities"
            onClick={requireLogin}
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
            href="/properties"
            className={({ isActive }) =>
              `relative w-full h-full flex flex-col gap-1 items-center justify-center text-xs 
             ${isActive ? "text-[#5E23DC]" : "text-[#868686]"}
            `
            }
          >
            {({ isActive }) => (
              <>
                <PiBuildingOfficeFill
                  size={26}
                  className={isActive ? "text-[#5E23DC]" : "text-[#868686]"}
                />
                <span>{isActive ? "Properties" : "Properties"}</span>
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
            href="/emi-calculator"
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
            href="/profile"
            onClick={requireLogin}
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
        <div className="shrink-0 flex items-center justify-end">
          <Link href="/">
            <img
              src="/assets/reparvLogo.svg"
              alt="reparv logo"
              className="w-[90px] md:w-[120px] lg:w-[135px]"
            />
          </Link>
        </div>

        {/* City Selector  */}
        <div
          onClick={() => {
            setShowCitySelector(true);
            //router.push("/properties");
          }}
          className={`selectCity shrink-0 min-w-[50px] max-w-[210px] relative py-2 rounded-lg px-4 cursor-pointer`}
        >
          <div className="flex lg:gap-1 items-center justify-center text-xs sm:text-base font-bold text-[#5E23DC] lg:p-1 ">
            <PiMapPinAreaBold className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 mr-1" />
            <span className="block whitespace-nowrap font-bold text-[#5E23DC] ">
              {selectedCity
                ? selectedCity.length > 12
                  ? `${selectedCity.slice(0, 11)}...`
                  : selectedCity
                : "Select City"}
            </span>
            <RiArrowDropDownLine className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-[#5E23DC]" />
          </div>
        </div>

        <div className="menu flex items-center justify-between md:hidden">
          <IoMdMenu
            onClick={() => {
              setShowSidebar(true);
            }}
            className="w-7 h-7 font-semibold cursor-pointer hover:text-[#5E23DC] active:scale-95"
          />
        </div>

        <nav className="navlink shrink-0 hidden md:flex items-center justify-start gap-4 lg:gap-2 xl:gap-3 2xl:gap-9 text-md font-semibold xl:text-base leading-[30px] tracking-[1px] lg:tracking-[0.1em] text-[#110229]">
          {DESKTOP_LINKS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className={({ isActive }) =>
                `${item.className ?? "flex"} whitespace-nowrap lg:mx-1.5 transition-colors hover:text-[#5E23DC] ${
                  isActive ? "font-bold text-[#5E23DC]" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="relative min-w-36 flex items-center justify-center p-4">
            <img
              src="/assets/home/ButtonBack.svg"
              alt=""
              className="absolute w-full pointer-events-none"
            />
            <a
              href={PARTNERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 z-10 flex items-center justify-center whitespace-nowrap text-sm font-medium text-white bg-[#8A38F5] border-2 border-[#8A38F5] rounded-full hover:opacity-90 transition active:scale-98"
            >
              Partners
            </a>
          </div>

          <div className="relative min-w-45 hidden lg:flex items-center justify-center p-4">
            <img
              src="/assets/home/ButtonBack.svg"
              alt=""
              className="absolute w-full pointer-events-none"
            />
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 z-10 flex items-center justify-center whitespace-nowrap text-sm font-medium text-white bg-[#8A38F5] border-2 border-[#8A38F5] rounded-full hover:opacity-90 transition active:scale-98"
            >
              Download App
            </a>
          </div>

          <UserDropdown />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
