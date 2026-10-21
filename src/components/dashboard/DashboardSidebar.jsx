"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoChevronForward, IoLogOutOutline } from "react-icons/io5";
import { FaUserEdit, FaPlus } from "react-icons/fa";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiBankLine } from "react-icons/ri";
import { useAuth } from "../../store/auth";
import { getImageURI } from "../../utils/helper";
import useLogout from "../../hooks/useLogout";

export const DASHBOARD_TABS = [
  { key: "profile", label: "Edit Profile", icon: <FaUserEdit /> },
  { key: "listings", label: "My Listings", icon: <HiOutlineClipboardList /> },
  { key: "home-loan", label: "Home Loan", icon: <RiBankLine /> },
];

export default function DashboardSidebar({ activeTab, onSelectTab }) {
  const { URI, user } = useAuth();
  const logout = useLogout();
  const [countData, setCountData] = useState({});

  useEffect(() => {
    const fetchCountData = async () => {
      try {
        const response = await fetch(`${URI}/user/dashboard/count`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch Count.");
        setCountData(await response.json());
      } catch (err) {
        console.error("Error fetching :", err);
      }
    };
    fetchCountData();
  }, [URI]);

  return (
    <aside className="w-full bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5">
      {/* User */}
      <div className="flex items-center gap-3">
        <img
          src={user?.userimage ? getImageURI(user.userimage) : "/assets/user/UserIcon.svg"}
          alt="user"
          className="w-14 h-14 shrink-0 rounded-full object-cover border-2 border-[#5323DC]"
        />
        <div className="min-w-0">
          <h3 className="font-bold truncate">{user?.fullname || "Welcome"}</h3>
          <p className="text-xs text-gray-500 truncate">
            {user?.email || user?.contact || ""}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <Stat label="Listings" value={countData?.totalProperty} />
        <Stat label="Enquiries" value={countData?.totalEnquiry} />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {DASHBOARD_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              aria-current={isActive ? "page" : undefined}
              className={`${
                isActive
                  ? "text-white bg-[#5323DC]"
                  : "text-gray-700 hover:text-[#5323DC] hover:bg-[#F2EBFF]"
              } w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg font-semibold transition`}
            >
              <span className="flex items-center gap-3">
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </span>
              <IoChevronForward />
            </button>
          );
        })}
      </nav>

      {/* Quick action */}
      <Link
        href="/sell-properties"
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] text-white font-semibold py-2.5 transition hover:opacity-95"
      >
        <FaPlus size={12} />
        List a Property
      </Link>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-500 text-red-500 font-semibold py-2 transition hover:bg-red-50"
      >
        <IoLogOutOutline size={20} />
        Logout
      </button>
    </aside>
  );
}

const Stat = ({ label, value }) => (
  <div className="rounded-xl bg-[#F2EBFF] py-2">
    <p className="text-lg font-bold text-[#5323DC]">{value ?? "00"}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);
