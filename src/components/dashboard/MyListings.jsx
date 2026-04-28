import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { FiSearch } from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";
import { HiOutlineHome, HiOutlineEye, HiOutlineHeart } from "react-icons/hi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaArrowUp } from "react-icons/fa6";
import ListingCard from "./ListingCard";

// Recharts imports
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
import { RiH2 } from "react-icons/ri";

export default function MyListings() {
  const navigate = useNavigate();
  const { URI, setLoading, setShowAlert, setPropertyId } = useAuth();
  const imageURI = import.meta.env.VITE_S3_IMAGE_URL;
  const [timeRange, setTimeRange] = useState("month");
  const [countData, setCountData] = useState({});
  const [listings, setListings] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  const [visibleListingsCount, setVisibleListingsCount] = useState(1);
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

  // ===== AGGREGATION LOGIC =====
  const getChartData = () => {
    const grouped = {};

    listings?.forEach((item) => {
      const date = new Date(item.created_at);
      let label = "";

      if (timeRange === "week") {
        label = date.toLocaleDateString("en-US", { weekday: "short" });
      }

      if (timeRange === "month") {
        label = date.toLocaleDateString("en-US", { month: "short" });
      }

      if (timeRange === "year") {
        label = date.getFullYear();
      }

      if (!grouped[label]) {
        grouped[label] = { label, views: 0, performance: 0 };
      }

      grouped[label].views += item.views;
      grouped[label].performance += item.performance;
    });

    return Object.values(grouped);
  };

  const chartData = getChartData();

  return (
    <div className="w-full bg-white py-4 lg:p-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 px-4 pb-4 border-b border-b-[#D9D9D9]">
        <div>
          <h1 className="text-2xl sm:text-2xl font-bold mb-1">My Listings</h1>
          <p className="hidden lg:block text-[#868686] text-sm xl:text-base">
            Manage and track your property listings
          </p>
        </div>

        <button
          onClick={() => {
            navigate("/sell-properties");
          }}
          className="flex items-center gap-2 bg-[#8A38F5] text-white px-4 lg:px-5 py-2 lg:py-3 rounded-lg shadow-[0px_4px_11px_2px_#8A38F540] hover:opacity-96 font-bold text-sm sm:text-base"
        >
          <LuCirclePlus className="w-5 h-5" /> Add New Listing
        </button>
      </div>

      <div className="w-full flex flex-col gap-4 p-4 py-6">
        {/* ================= STATS CARDS ================= */}
        <div className="w-full h-[80px] lg:h-[180px] xl:h-[80px] grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
          <StatCard
            icon={
              <HiOutlineHome className="text-purple-600 w-9 h-8 lg:w-11 lg:h-10" />
            }
            title="Total Listings"
            value={countData?.totalProperty || "00"}
          />
          <StatCard
            icon={
              <HiOutlineEye className="text-blue-500 w-9 h-8 lg:w-11 lg:h-10" />
            }
            title="Total Views"
            value={countData?.totalViews || "00"}
          />
          <StatCard
            icon={
              <BiMessageRoundedDots className="text-green-600 w-9 h-8 lg:w-11 lg:h-10" />
            }
            title="Enquiries"
            value={countData?.totalEnquiry || "00"}
            scrollToId={
              enquiries?.length > 0 ? "enquiries" : ""
            }
          />
          <StatCard
            icon={
              <HiOutlineHeart className="text-orange-500 w-9 h-8 lg:w-11 lg:h-10" />
            }
            title="Saved Count"
            value={countData?.totalLikes || "00"}
          />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
          {/* Views Over Time */}
          <div className="bg-white rounded-xl p-4 lg:p-4 border border-[#D9D9D9] shadow w-full h-64 lg:h-72">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
              <h3 className="font-semibold text-base">Views Over Time</h3>
              <div className="flex items-center gap-2 lg:gap-3 text-xs text-gray-400 flex-wrap">
                <span
                  onClick={() => setTimeRange("week")}
                  className={`cursor-pointer ${
                    timeRange === "week"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Week
                </span>
                <span
                  onClick={() => setTimeRange("month")}
                  className={`cursor-pointer ${
                    timeRange === "month"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Month
                </span>
                <span
                  onClick={() => setTimeRange("year")}
                  className={`cursor-pointer ${
                    timeRange === "year"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Year
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: -10 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis width={30} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#7C3AED"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Enquiries */}
          <div className="bg-white rounded-xl p-2 lg:p-4 border border-[#D9D9D9] shadow w-full h-64 lg:h-72">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
              <h3 className="font-semibold text-base">Enquiries</h3>
              <div className="flex items-center gap-2 lg:gap-3 text-xs text-gray-400 flex-wrap">
                <span
                  onClick={() => setTimeRange("week")}
                  className={`cursor-pointer ${
                    timeRange === "week"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Week
                </span>
                <span
                  onClick={() => setTimeRange("month")}
                  className={`cursor-pointer ${
                    timeRange === "month"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Month
                </span>
                <span
                  onClick={() => setTimeRange("year")}
                  className={`cursor-pointer ${
                    timeRange === "year"
                      ? "text-[#5323DC] font-medium bg-[#F5EDFF] px-2 py-1 rounded"
                      : ""
                  }`}
                >
                  Year
                </span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: -10 }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis width={30} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="enquiries" fill="#7C3AED" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= YOUR LISTINGS ================= */}
        <div className="w-full bg-white rounded-xl p-4 border border-[#D9D9D9] shadow space-y-6">
          {listings?.length > 0 ? (
            <div className="space-y-4 w-full">
              {visibleListings?.map((item) => (
                <ListingCard
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
          ) : (
            <h2 className="font-bold m-4 text-center">Listings Not Found</h2>
          )}
        </div>

        <div id="enquiries">
          {enquiries?.length > 0 && <Enquiries enquiries={enquiries} />}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, title, value, scrollToId }) {
  const handleClick = () => {
    if (!scrollToId) return;

    const section = document.getElementById(scrollToId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl p-4 shadow flex items-center gap-3 sm:gap-4 w-full border border-[#D9D9D9] cursor-pointer"
    >
      {icon}
      <div>
        <p className="text-[#868686] text-xs lg:text-sm">{title}</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="text-base lg:text-xl font-bold">{value}</h3>
          <span className="hidden items-center gap-[2px] text-green-500 text-xs">
            <FaArrowUp /> 12%
          </span>
        </div>
      </div>
    </div>
  );
}
