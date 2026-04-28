import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import EditProfile from "../components/dashboard/EditProfile";
import MyListings from "../components/dashboard/MyListings";
import HomeLoan from "../components/dashboard/HomeLoan";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Edit Profile");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        navigate("/profile");
      }
    };

    // Check on first load
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  return (
    <div className="w-full max-w-[1380px] min-h-screen mx-auto bg-[#fbfaff] hidden md:flex flex-col lg:flex-row gap-6 lg:pr-6">
      
      {/* ================= SIDEBAR ================= */}
      <div className="min-w-[300px] w-full lg:w-[300px] lg:h-screen sticky top-0 self-start overflow-scroll scrollbar-hide">
        <DashboardSidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-full flex flex-col h-screen overflow-scroll scrollbar-hide">
        {activeMenu === "Edit Profile" && <EditProfile />}
        {activeMenu === "My Listings" && <MyListings />}
        {activeMenu === "Home Loan" && <HomeLoan />}
      </div>
    </div>
  );
}