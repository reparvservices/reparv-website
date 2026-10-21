"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import DashboardSidebar, { DASHBOARD_TABS } from "../components/dashboard/DashboardSidebar";
import EditProfile from "../components/dashboard/EditProfile";
import MyListings from "../components/dashboard/MyListings";
import HomeLoan from "../components/dashboard/HomeLoan";
import { useAuth } from "../store/auth";

const TAB_CONTENT = {
  profile: EditProfile,
  listings: MyListings,
  "home-loan": HomeLoan,
};

// Mobile has dedicated pages for each dashboard section
const MOBILE_ROUTES = {
  profile: "/profile",
  listings: "/my-listings",
  "home-loan": "/home-loan",
};

const MOBILE_QUERY = "(max-width: 767px)";

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, setShowLogin } = useAuth();

  const requestedTab = searchParams.get("tab");
  const activeTab = TAB_CONTENT[requestedTab] ? requestedTab : DASHBOARD_TABS[0].key;
  const ActiveContent = TAB_CONTENT[activeTab];

  // The store loads the user from localStorage after mount, so check it directly
  // before deciding the visitor is logged out.
  const [sessionChecked, setSessionChecked] = useState(false);
  const [hasStoredUser, setHasStoredUser] = useState(false);
  useEffect(() => {
    try {
      setHasStoredUser(!!localStorage.getItem("guestUser"));
    } catch {
      /* ignore */
    }
    setSessionChecked(true);
  }, []);
  const isLoggedIn = !!user || hasStoredUser;

  // Send small screens to the matching mobile page (on load and when crossing the breakpoint)
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const redirectIfMobile = () => {
      if (media.matches) router.replace(MOBILE_ROUTES[activeTab]);
    };
    redirectIfMobile();
    media.addEventListener("change", redirectIfMobile);
    return () => media.removeEventListener("change", redirectIfMobile);
  }, [router, activeTab]);

  const selectTab = (tab) => {
    router.replace(`${pathname}?tab=${tab}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!sessionChecked) return null;

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-[60vh] hidden md:flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold">Your Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Please log in to manage your profile, listings and home loan applications.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="mt-6 w-full rounded-lg bg-[#5323DC] text-white font-semibold py-3 transition hover:opacity-95"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1380px] mx-auto bg-[#fbfaff] hidden md:flex gap-6 px-4 lg:px-6 py-6">
      {/* ================= SIDEBAR ================= */}
      <div className="w-[260px] lg:w-[300px] shrink-0 sticky top-[110px] self-start">
        <DashboardSidebar activeTab={activeTab} onSelectTab={selectTab} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 min-w-0 rounded-2xl overflow-hidden">
        <ActiveContent />
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
