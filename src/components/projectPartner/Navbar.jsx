"use client";

import Link from "next/link";
import NavLink from "../NavLinkNext.jsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import reparvLogo from "../../assets/reparvLogo.svg";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { RiMobileDownloadLine } from "react-icons/ri";
import { MdOutlineLocalPhone } from "react-icons/md";
import { BsExclamationCircle } from "react-icons/bs";
import { getImageURI } from "../../utils/helper";

function Navbar({ projectPartner }) {
  const { URI, selectedCity, setSelectedCity, setIsContactOpen } = useAuth();

  const router = useRouter();
  const pathname = usePathname();
  const [cities, setCities] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return pathname === path ? "font-bold text-[#0BB501]" : "";
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/project-partner/cities/${projectPartner?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok)
        throw new Error("Failed to fetch Project Partner Cities.");

      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching:", err);
      setCities([]);
    }
  };

  useEffect(() => {
    fetchCities();
  }, [projectPartner]);


  return (
    <div className="navbar hidden md:flex z-30 fixed top-0 w-full h-15 md:h-18 px-8 lg:px-25 gap-5 items-center justify-between bg-white shadow-[0px_1px_3px_1px_#00000026]">
      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="sidebar w-full fixed md:hidden top-0 right-0 z-10 bg-white flex flex-col items-end gap-5 pb-8 shadow-[0px_1px_3px_1px_#00000026]">
          <div className="div w-full flex items-center justify-between h-15 sm:h-22 shadow-[0px_1px_3px_1px_#00000026] px-8">
            <div className="flex items-center justify-center ">
              <Link href="/">
                <div className="flex flex-col gap-2">
                  <img
                    src={
                      projectPartner?.businessLogo
                        ? getImageURI(projectPartner?.businessLogo)
                        : reparvLogo
                    }
                    alt="logo"
                    className="max-h-10 object-contain"
                  />
                  <span className="text-[8px]">Partner with Reparv</span>
                </div>
              </Link>
            </div>
            <div className="menu flex items-center justify-between md:hidden">
              <RxCross2
                onClick={() => {
                  setShowSidebar(false);
                }}
                className="w-7 h-7 cursor-pointer hover:text-[#076300] active:scale-95"
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 px-10 font-medium text-[#110229]">
            <NavLink
              href="https://play.google.com/store/apps/details?id=com.reparvcustomer"
              onClick={() => {
                setShowSidebar(false);
              }}
              className={`${getNavLinkClass(
                "/",
              )} flex gap-2 items-center justify-center`}
            >
              <RiMobileDownloadLine />
              <select
                className="p-2 border rounded-md cursor-pointer"
                onChange={(e) => {
                  const url = e.target.value;
                  if (url !== "") {
                    window.open(url, "_blank"); // open Play Store link in new tab
                    setShowSidebar(false);
                  }
                }}
              >
                <option value="">Download App</option>
                <option value="https://play.google.com/store/apps/details?id=com.reparvcustomer">
                  Customer App
                </option>

                <option value="https://play.google.com/store/apps/details?id=com.reparvprojectpartner">
                  Project Partner App
                </option>

              </select>
            </NavLink>
            <NavLink
              onClick={() => {
                setShowSidebar(false);
              }}
              href="/project-partner"
              className={`${getNavLinkClass(
                "/contact-us",
              )} flex gap-2 items-center justify-center`}
            >
              <MdOutlineLocalPhone />
              Contact Us
            </NavLink>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="flex items-center justify-end">
        <Link href="/">
          <div className="flex flex-col">
            <img
              src={
                projectPartner?.businessLogo
                  ? getImageURI(projectPartner?.businessLogo)
                  : reparvLogo
              }
              alt="reparv logo"
              className="max-h-12 object-contain"
            />
            <span
              className={`${
                !projectPartner?.businessLogo && "hidden"
              } text-[8px] text-end`}
            >
              Partner with Reparv
            </span>
          </div>
        </Link>
      </div>

      <div className="menu flex items-center justify-between md:hidden">
        <IoMdMenu
          onClick={() => {
            setShowSidebar(true);
          }}
          className="w-7 h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>

      <div className="navlink hidden md:flex items-center justify-start gap-5 lg:gap-6 xl:gap-14 text-sm font-medium xl:text-sm leading-[30px] tracking-[1px] lg:tracking-[0.1em] text-[#110229]">
        {/* City Selector */}
        <div className="relative min-w-[120px] max-w-[210px]">
          {/* Icons & Selected Label */}
          <div className="flex items-center gap-1 text-sm font-medium pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-black">
            <CiLocationOn className="w-4 h-4" />
          </div>

          {/* City Select */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-8 py-2 text-sm font-medium cursor-pointer appearance-none bg-white outline-none border-none"
          >
            <option value="">Select City</option>
            {cities?.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Dropdown Arrow */}
          <RiArrowDropDownLine className="pointer-events-none w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2 text-[#000000B2]" />
        </div>

        <NavLink
          onClick={() => {
            setShowSidebar(false);
          }}
          className={`${getNavLinkClass(
            "/",
          )} flex gap-2 items-center justify-center`}
        >
          <RiMobileDownloadLine />
          <select
            className="cursor-pointer appearance-none outline-none border-none"
            onChange={(e) => {
              const url = e.target.value;
              if (url !== "") {
                window.open(url, "_blank"); // open Play Store link in new tab
                setShowSidebar(false);
              }
            }}
          >
            <option value="">Download App</option>
            <option value="https://play.google.com/store/apps/details?id=com.reparvcustomer">
              Customer App
            </option>
            <option value="https://play.google.com/store/apps/details?id=com.reparvnewsalesapp">
              Sales App
            </option>
            <option value="https://play.google.com/store/apps/details?id=com.newreparvterritory_app">
              Territory App
            </option>
          </select>
          {/* Dropdown Arrow */}
          <RiArrowDropDownLine size={24} />
        </NavLink>

        <NavLink
          onClick={() => {
            setIsContactOpen(true);
          }}
          className={`${getNavLinkClass(
            "/contact-us",
          )} flex gap-2 items-center justify-center`}
        >
          <MdOutlineLocalPhone />
          Contact Us
        </NavLink>

        {/*<JoinOurTeamDropdown className={`flex gap-1`}></JoinOurTeamDropdown>*/}
      </div>
    </div>
  );
}

export default Navbar;
