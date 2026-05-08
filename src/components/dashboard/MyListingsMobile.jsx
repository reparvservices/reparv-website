"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth.jsx";
import {
  HiArrowLeft,
  HiOutlineHome,
  HiOutlineEye,
  HiOutlineHeart,
} from "react-icons/hi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { LuCirclePlus } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa6";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Enquiries from "./Enquiries";
import ListingCardMobile from "./ListingCardMobile";
import { aggregateChartData } from "../../utils/chart.js";

// ===== DUMMY DB-LIKE DATA =====
const dummyRawChartData = [
  { created_at: "2025-01-02T10:30:00", views: 5, performance: 3 },
  { created_at: "2025-01-05T14:20:00", views: 8, performance: 6 },
  { created_at: "2025-01-10T09:15:00", views: 12, performance: 9 },
  { created_at: "2025-02-02T11:00:00", views: 18, performance: 14 },
  { created_at: "2025-02-12T13:40:00", views: 25, performance: 20 },
  { created_at: "2025-03-01T17:50:00", views: 35, performance: 30 },
  { created_at: "2025-03-15T19:30:00", views: 40, performance: 32 },
];

export default function MyListingsMobile() {
  const router = useRouter();
  const { URI, setLoading, setShowAlert } = useAuth();

  const [countData, setCountData] = useState({});
  const [listings, setListings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [rawChartData, setRawChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("month");

  const [visibleListingsCount, setVisibleListingsCount] = useState(3);
  const visibleListings = listings?.slice(0, visibleListingsCount);

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

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/user/properties", {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setListings(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Fetch Data
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URI}/user/enquirers/get/`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Enquirers.");
      const data = await response.json();
      setEnquiries(data);
    } catch (err) {
      console.error("Error fetching :", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const delProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await fetch(URI + `/user/properties/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setShowAlert({
          ...setShowAlert,
          show: true,
          type: "success",
          message: "Property Deleted Successfully",
        });
        // Refresh employee list
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountData();
    fetchData();
    fetchEnquiries();
  }, []);

  useEffect(() => {
    // TEMP: using dummy data
    setRawChartData(listings);
  }, []);

  const chartData = aggregateChartData(rawChartData, timeRange);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="md:hidden min-h-screen bg-[#FAF8FF]">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-b-[#D9D9D9] ">
        <HiArrowLeft
          onClick={() => router.back()}
          className="w-6 h-6 cursor-pointer"
        />

        <h1 className="text-lg font-bold">My Listings</h1>

        <button
          onClick={() => router.push("/sell-properties")}
          className="w-9 h-9 bg-[#8A38F5] rounded-xl flex items-center justify-center text-white"
        >
          <LuCirclePlus />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* ===== STATS ===== */}
        <div className="grid grid-cols-2 gap-3 ">
          <StatCard
            icon={<HiOutlineHome className="text-purple-600 w-7 h-7" />}
            title="Total Listings"
            value={countData?.totalProperty || "00"}
          />
          <StatCard
            icon={<HiOutlineEye className="text-blue-500 w-7 h-7" />}
            title="Total Views"
            value={countData?.totalViews || "00"}
          />
          <StatCard
            icon={<BiMessageRoundedDots className="text-green-600 w-7 h-7" />}
            title="Enquiries"
            value={countData?.totalEnquiry || "00"}
            scrollToId="enquiries"
          />
          <StatCard
            icon={<HiOutlineHeart className="text-orange-500 w-7 h-7" />}
            title="Saved Count"
            value={countData?.totalLikes || "00"}
          />
        </div>

        {/* ===== LINE CHART ===== */}
        <ChartWrapper
          title="Views Over Time"
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        >
          <LineChart data={chartData}>
            <CartesianGrid stroke="#f1f1f1" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={28} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#7C3AED"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartWrapper>

        {/* ===== BAR CHART ===== */}
        <ChartWrapper
          title="Enquiries"
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        >
          <BarChart data={chartData}>
            <CartesianGrid stroke="#f1f1f1" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} width={28} />
            <Tooltip />
            <Bar
              dataKey="enquiries"
              fill="#7C3AED"
              radius={[4, 4, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ChartWrapper>

        {/* ===== LISTINGS ===== */}
        {listings?.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Your Listings</h3>
            {visibleListings?.map((item) => (
              <ListingCardMobile
                key={item.id}
                property={item}
                delProperty={delProperty}
              />
            ))}
            {/* Load more Properties Button */}
            <div className="mt-2 flex justify-center">
              <button
                onClick={() => {
                  setVisibleListingsCount((c) => c + 3);
                }}
                className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50 shadow cursor-pointer"
              >
                Load More Properties
              </button>
            </div>
          </div>
        )}

        <div id="enquiries">
          {enquiries?.length > 0 && <Enquiries enquiries={enquiries} />}
        </div>
      </div>
    </div>
  );
}

/* ===== STAT CARD ===== */
function StatCard({ icon, title, value, scrollToId }) {
  const handleClick = () => {
    if (!scrollToId) return;
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-[#D9D9D9] rounded-xl p-4 flex gap-2 items-center cursor-pointer"
    >
      {icon}
      <div>
        <p className="text-xs text-[#868686]">{title}</p>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{value}</h3>
          <span className="hidden items-center text-green-500 text-xs gap-1">
            <FaArrowUp /> 12%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===== CHART WRAPPER ===== */
function ChartWrapper({ title, timeRange, setTimeRange, children }) {
  return (
    <div className="bg-white border border-[#D9D9D9] rounded-xl p-3">
      <div className="flex flex-col items-center gap-2 mb-3">
        <h3 className="font-semibold text-sm">{title}</h3>

        <div className="flex gap-2 text-[11px]">
          {["week", "month", "year"].map((range) => (
            <span
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-[2px] rounded cursor-pointer ${
                timeRange === range
                  ? "bg-[#F5EDFF] text-[#5323DC] font-medium"
                  : "text-gray-400"
              }`}
            >
              {range.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full h-48">
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </div>
  );
}
