"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../store/auth";
import { FaChevronRight } from "react-icons/fa6";
import {
  IoArrowBack,
  IoNotificationsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaEdit, FaHeart, FaPhoneAlt, FaHome } from "react-icons/fa";
import { MdApartment, MdArticle, MdPrivacyTip } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { BsFileEarmarkText } from "react-icons/bs";
import { MdPolicy } from "react-icons/md";
import { getImageURI } from "../../utils/helper";

const Profile = () => {
  const router = useRouter();
  const { delTokenInCookie, URI, user } = useAuth();
  const ImageUri = import.meta.env.VITE_S3_IMAGE_URL;

  const [countData, setCountData] = useState({});

  const fetchCountData = async () => {
    try {
      const response = await fetch(`${URI}/user/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Count.");
      const data = await response.json();
      //console.log(data);
      setCountData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const userLogout = async () => {
    try {
      await axios.post(URI + "/user/logout", {}, { withCredentials: true });

      // Clear local auth data
      localStorage.removeItem("guestUser");
      localStorage.removeItem("accessToken"); // if you stored it

      delTokenInCookie(); // optional if backend already clears

      // Navigate first
      router.replace("/");

      // Reload after navigation (guaranteed clean state)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  useEffect(() => {
    fetchCountData();
  }, []);

  // Redirect to dashboard on md and above
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        router.push("/dashboard");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  return (
    <div className="w-full md:hidden bg-[#FAF8FF] px-4 py-5 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <IoArrowBack
          size={22}
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <h2 className="text-lg font-bold">Profile</h2>
        <IoNotificationsOutline size={22} />
      </div>

      {/* User Info */}
      <div className="w-full flex items-center gap-4 my-4">
        <img
          src={user?.userimage ? getImageURI(user?.userimage) : "/assets/user/UserIcon.svg"}
          alt="user"
          className="w-16 h-16 rounded-full border-2 border-[#5323DC] "
        />
        <div className="w-full flex flex-col overflow-scroll scrollbar-hide">
          <h3 className="font-semibold">
            {user?.fullname || "User Name !"}{" "}
          </h3>
          <span className="text-xs font-semibold">
            {user?.email || "*************@gmail.com"}
          </span>
        </div>
        <button
          onClick={() => {
            router.push("/profile-edit");
          }}
          className="flex gap-2 items-center bg-[#5323DC] px-4 py-2 rounded-full text-white"
        >
          <FaEdit size={14} />
          <span className="text-xs">Edit</span>
        </button>
      </div>

      <div className="h-[1px] w-full bg-[linear-gradient(90deg,#FAF8FF_12.88%,#8A38F5_50%,#FAF8FF_81.15%)] mb-6" />

      {/* Stats */}
      <div className="grid gap-4 grid-cols-3 bg-white rounded-2xl p-4 mb-6 shadow-sm text-center">
        <Stat
          icon={<MdApartment className="text-purple-600" />}
          label="My Listings"
          value={countData?.totalProperty || "00"}
        />
        <Stat
          icon={<FaHeart className="text-red-500" />}
          label="Saved"
          value="00"
        />
        <Stat
          icon={<FaPhoneAlt className="text-purple-600" />}
          label="Contacted"
          value={countData?.totalEnquiry || "00"}
        />
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-8 space-y-8">
        <MenuItem
          icon={<HiOutlineClipboardList />}
          label="My Listings"
          href="/my-listings"
        />
        <MenuItem
          icon={<FaHome />}
          label="Sell Property"
          href="/sell-properties"
        />
        <MenuItem icon={<FaHome />} label="Home loans" href="/home-loan" />
        <MenuItem icon={<MdArticle />} label="Blogs" href="/blogs" />
        {/*
        <MenuItem
          icon={<MdPrivacyTip />}
          label="Privacy Settings"
          href="/my-listings"
        />
        <MenuItem
          icon={<RiCustomerService2Line />}
          label="Help Center"
          href="/help-center"
        />
         */}
        <MenuItem
          icon={<BsFileEarmarkText />}
          label="Terms & Conditions"
          href="/terms-and-conditions"
        />
        <MenuItem
          icon={<MdPolicy />}
          label="Privacy Policy"
          href="/privacy-policy"
        />
      </div>

      {/* Logout */}
      <button
        onClick={userLogout}
        className="mt-10 w-full text-sm border border-red-500 text-red-500 py-2 rounded-xl flex items-center justify-center gap-2 font-semibold"
      >
        <IoLogOutOutline size={24} />
        Logout
      </button>
    </div>
  );
};

export default Profile;

/* ---------- Sub Components ---------- */

const Stat = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1 items-center">
    <div className="w-15 h-12 bg-[#F2EBFF] flex items-center justify-center rounded-xl text-xl">
      {icon}
    </div>
    <p className="text-xl font-bold">{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

const MenuItem = ({ icon, label, href }) => (
  <Link href={href} className="flex items-center justify-between cursor-pointer">
    <div className="flex items-center gap-3 text-[#5323DC]">
      <div className="text-2xl">{icon}</div>
      <span className="text-black text-xs font-bold">{label}</span>
    </div>
    <FaChevronRight className="text-base" />
  </Link>
);
