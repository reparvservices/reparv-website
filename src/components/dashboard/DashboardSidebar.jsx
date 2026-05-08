"use client"

import { MdDashboard } from "react-icons/md";
import { IoChevronForward } from "react-icons/io5";

export default function DashboardSidebar({activeMenu, setActiveMenu}) {
  
  return (
    <div className="w-full lg:w-[300px] lg:h-screen bg-white p-4">
      <div className="py-4 border-b border-b-[#D9D9D9]">
        <h2 className="flex items-center lg:justify-center gap-2 font-bold text-2xl pl-6 lg:pl-0">
          <MdDashboard /> Dashboard
        </h2>
      </div>

      <div className="p-6 space-y-2">
        <div onClick={()=>setActiveMenu("Edit Profile")} className={`${activeMenu === "Edit Profile" ? "w-full text-white bg-[#5323DC] rounded-lg":"hover:text-[#5323DC]"} flex justify-between items-center px-4 py-2 cursor-pointer font-bold `}>
          <span>Edit Profile</span>
          <IoChevronForward />
        </div>

        <div onClick={()=>setActiveMenu("My Listings")} className={`${activeMenu === "My Listings" ? "w-full text-white bg-[#5323DC] rounded-lg":"hover:text-[#5323DC]"} flex justify-between items-center px-4 py-2 cursor-pointer font-bold `}>
          <span>My Listings</span>
          <IoChevronForward />
        </div>

        <div onClick={()=>setActiveMenu("Home Loan")} className={`${activeMenu === "Home Loan" ? "w-full text-white bg-[#5323DC] rounded-lg":"hover:text-[#5323DC]"} flex justify-between items-center px-4 py-2 cursor-pointer font-bold `}>
          <span>Home Loan</span>
          <IoChevronForward />
        </div>
      </div>
    </div>
  );
}
