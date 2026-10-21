"use client"

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../store/auth";
import { FiSearch } from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";
import { HiOutlineHome, HiOutlineEye, HiOutlineHeart } from "react-icons/hi";
import { BiMessageRoundedDots } from "react-icons/bi";
import ListingCard from "./ListingCard";
import Enquiries from "./Enquiries";
import { listingStatusFor } from "../../utils/propertyListing";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const LISTINGS_PAGE_SIZE = 5;
const CHART_COLOR = "#7C3AED";
const AXIS_TICK = { fontSize: 11, fill: "#6B7280" };

const ENQUIRY_RANGES = [
  { key: "7d", label: "7 Days" },
  { key: "6m", label: "6 Months" },
  { key: "12m", label: "12 Months" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Enquiry dates arrive as "21 Oct 2026 | 02:30 PM" (IST) from the backend
const parseEnquiryDate = (value) => {
  if (!value) return null;
  const [day, mon, year] = String(value).split("|")[0].trim().split(" ");
  const month = MONTHS.indexOf(mon);
  if (month < 0) return null;
  return new Date(Number(year), month, Number(day));
};

const buildEnquirySeries = (enquiries, range) => {
  const today = new Date();
  const buckets = [];

  if (range === "7d") {
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      buckets.push({
        key: d.toDateString(),
        label: d.toLocaleDateString("en-IN", { weekday: "short" }),
        enquiries: 0,
      });
    }
  } else {
    const months = range === "6m" ? 6 : 12;
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      buckets.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: `${MONTHS[d.getMonth()]}${months === 12 ? ` '${String(d.getFullYear()).slice(2)}` : ""}`,
        enquiries: 0,
      });
    }
  }

  const index = Object.fromEntries(buckets.map((b, i) => [b.key, i]));
  enquiries?.forEach((item) => {
    const date = parseEnquiryDate(item?.created_at);
    if (!date) return;
    const key =
      range === "7d" ? date.toDateString() : `${date.getFullYear()}-${date.getMonth()}`;
    if (index[key] !== undefined) buckets[index[key]].enquiries += 1;
  });

  return buckets;
};

export default function MyListings() {
  const router = useRouter();
  const { URI, setLoading, setShowAlert } = useAuth();
  const [countData, setCountData] = useState({});
  const [listings, setListings] = useState([]);
  const [listingsLoaded, setListingsLoaded] = useState(false);
  const [enquiries, setEnquiries] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [visibleListingsCount, setVisibleListingsCount] = useState(LISTINGS_PAGE_SIZE);
  const [enquiryRange, setEnquiryRange] = useState("6m");

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
      setCountData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/user/properties", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setListings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching :", err);
    } finally {
      setListingsLoaded(true);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(`${URI}/user/enquirers/get/`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Enquirers.");
      const data = await response.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const delProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    setLoading(true);
    try {
      const response = await fetch(URI + `/user/properties/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setShowAlert({
          show: true,
          type: "success",
          title: "",
          message: "Property Deleted Successfully",
        });
        fetchData();
        fetchCountData();
      } else {
        setShowAlert({
          show: true,
          type: "error",
          title: "",
          message: data?.message || "Could not delete the property",
        });
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

  // ===== FILTERING =====
  const statusOptions = useMemo(() => {
    const statuses = [...new Set(listings.map((l) => listingStatusFor(l)))];
    return ["All", ...statuses];
  }, [listings]);

  const filteredListings = useMemo(() => {
    const term = search.trim().toLowerCase();
    return listings.filter((item) => {
      const matchesStatus = statusFilter === "All" || listingStatusFor(item) === statusFilter;
      const matchesSearch =
        !term ||
        [item?.propertyName, item?.address, item?.location, item?.city]
          .filter(Boolean)
          .some((v) => String(v).toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }, [listings, search, statusFilter]);

  useEffect(() => {
    setVisibleListingsCount(LISTINGS_PAGE_SIZE);
  }, [search, statusFilter]);

  const visibleListings = filteredListings.slice(0, visibleListingsCount);
  const hasMoreListings = filteredListings.length > visibleListingsCount;

  // ===== CHART DATA =====
  const topListingsByViews = useMemo(
    () =>
      [...listings]
        .map((l) => ({
          name: l?.propertyName || "Untitled",
          views: Number(l?.views) || 0,
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 6),
    [listings],
  );
  const hasViews = topListingsByViews.some((l) => l.views > 0);

  const enquirySeries = useMemo(
    () => buildEnquirySeries(enquiries, enquiryRange),
    [enquiries, enquiryRange],
  );
  const hasEnquiriesInRange = enquirySeries.some((b) => b.enquiries > 0);

  const scrollToEnquiries = () => {
    document.getElementById("enquiries")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full bg-white py-4 lg:p-6 rounded-2xl shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2 px-4 pb-4 border-b border-b-[#D9D9D9]">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Listings</h1>
          <p className="text-[#868686] text-sm">
            Manage and track your property listings
          </p>
        </div>

        <button
          onClick={() => {
            router.push("/sell-properties");
          }}
          className="flex items-center gap-2 bg-[#8A38F5] text-white px-4 lg:px-5 py-2 lg:py-3 rounded-lg shadow-[0px_4px_11px_2px_#8A38F540] hover:opacity-95 font-bold text-sm sm:text-base"
        >
          <LuCirclePlus className="w-5 h-5" /> Add New Listing
        </button>
      </div>

      <div className="w-full flex flex-col gap-5 p-4 py-6">
        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            icon={<HiOutlineHome className="text-purple-600 w-7 h-7" />}
            title="Total Listings"
            value={countData?.totalProperty}
          />
          <StatCard
            icon={<HiOutlineEye className="text-blue-500 w-7 h-7" />}
            title="Total Views"
            value={countData?.totalViews}
          />
          <StatCard
            icon={<BiMessageRoundedDots className="text-green-600 w-7 h-7" />}
            title="Enquiries"
            value={countData?.totalEnquiry}
            onClick={enquiries.length > 0 ? scrollToEnquiries : undefined}
            actionLabel={enquiries.length > 0 ? "View" : ""}
          />
          <StatCard
            icon={<HiOutlineHeart className="text-orange-500 w-7 h-7" />}
            title="Saved by Users"
            value={countData?.totalLikes}
          />
        </div>

        {/* ================= LISTINGS ================= */}
        <section className="w-full bg-white rounded-xl p-4 border border-[#D9D9D9]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">
              Your Properties{" "}
              <span className="text-sm font-normal text-gray-500">
                ({filteredListings.length}
                {filteredListings.length !== listings.length ? ` of ${listings.length}` : ""})
              </span>
            </h2>

            {listings.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {statusOptions.length > 2 && (
                  <div className="flex flex-wrap gap-1.5">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                          statusFilter === status
                            ? "bg-[#5323DC] text-white border-[#5323DC]"
                            : "bg-white text-gray-600 border-[#D9D9D9] hover:border-[#5323DC]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
                <label className="flex items-center gap-2 border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm text-gray-500 focus-within:border-[#8A38F5]">
                  <FiSearch />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or location"
                    className="outline-none w-full sm:w-52 text-gray-800"
                  />
                </label>
              </div>
            )}
          </div>

          {!listingsLoaded ? (
            <div className="space-y-3">
              {[0, 1].map((i) => (
                <div key={i} className="h-36 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : listings.length === 0 ? (
            <EmptyState
              title="You haven't listed any property yet"
              description="List your property for free and start getting enquiries from verified buyers and tenants."
              actionLabel="List a Property"
              onAction={() => router.push("/sell-properties")}
            />
          ) : filteredListings.length === 0 ? (
            <EmptyState
              title="No properties match your search"
              actionLabel="Clear filters"
              onAction={() => {
                setSearch("");
                setStatusFilter("All");
              }}
            />
          ) : (
            <div className="space-y-4 w-full">
              {visibleListings.map((item) => (
                <ListingCard
                  key={item.propertyid}
                  property={item}
                  delProperty={delProperty}
                />
              ))}
              {hasMoreListings && (
                <div className="mt-2 flex justify-center">
                  <button
                    onClick={() => setVisibleListingsCount((c) => c + LISTINGS_PAGE_SIZE)}
                    className="px-6 py-2 border border-[#8A38F5] font-semibold rounded-full bg-white text-[#8A38F5] hover:bg-purple-50"
                  >
                    Show More ({filteredListings.length - visibleListingsCount} left)
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================= PERFORMANCE CHARTS ================= */}
        {listings.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Top listings by views */}
            <ChartCard title="Most Viewed Properties" subtitle="Total views per listing">
              {hasViews ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={topListingsByViews}
                    layout="vertical"
                    margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
                    barCategoryGap={8}
                  >
                    <CartesianGrid stroke="#F3F4F6" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={120}
                      tick={AXIS_TICK}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (v.length > 16 ? `${v.slice(0, 15)}…` : v)}
                    />
                    <Tooltip cursor={{ fill: "#F5EDFF" }} content={<ChartTooltip unit="views" />} />
                    <Bar dataKey="views" fill={CHART_COLOR} radius={[0, 4, 4, 0]} maxBarSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ChartEmpty text="No views yet. Share your listings to get more visibility." />
              )}
            </ChartCard>

            {/* Enquiries over time */}
            <ChartCard
              title="Enquiries Over Time"
              subtitle="Enquiries received on your listings"
              actions={
                <div className="flex items-center gap-1 text-xs">
                  {ENQUIRY_RANGES.map((range) => (
                    <button
                      key={range.key}
                      onClick={() => setEnquiryRange(range.key)}
                      className={`px-2.5 py-1 rounded-md font-medium transition ${
                        enquiryRange === range.key
                          ? "text-[#5323DC] bg-[#F5EDFF]"
                          : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              }
            >
              {hasEnquiriesInRange ? (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={enquirySeries} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid stroke="#F3F4F6" vertical={false} />
                    <XAxis dataKey="label" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={AXIS_TICK} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#F5EDFF" }} content={<ChartTooltip unit="enquiries" />} />
                    <Bar dataKey="enquiries" fill={CHART_COLOR} radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ChartEmpty text="No enquiries in this period." />
              )}
            </ChartCard>
          </div>
        )}

        {/* ================= ENQUIRIES ================= */}
        <div id="enquiries" className="scroll-mt-28">
          {enquiries.length > 0 && <Enquiries enquiries={enquiries} />}
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, title, value, onClick, actionLabel }) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`bg-white rounded-xl p-4 flex items-center gap-3 w-full border border-[#D9D9D9] text-left ${
        onClick ? "hover:border-[#8A38F5] transition" : ""
      }`}
    >
      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#F8F5FF] flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[#868686] text-xs lg:text-sm truncate">{title}</p>
        <h3 className="text-xl font-bold">{value ?? 0}</h3>
      </div>
      {actionLabel && (
        <span className="text-xs font-semibold text-[#5323DC]">{actionLabel} →</span>
      )}
    </Wrapper>
  );
}

function ChartCard({ title, subtitle, actions, children }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#D9D9D9] w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div>
          <h3 className="font-semibold text-base">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  const row = payload[0];
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 shadow-md text-xs">
      <p className="font-semibold text-gray-800">{label ?? row?.payload?.name}</p>
      <p className="text-gray-600">
        {row.value} {unit}
      </p>
    </div>
  );
}

function ChartEmpty({ text }) {
  return (
    <div className="h-[240px] flex items-center justify-center rounded-lg bg-[#FAFAFA] text-sm text-gray-500 text-center px-6">
      {text}
    </div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="py-10 flex flex-col items-center text-center gap-2">
      <HiOutlineHome className="w-10 h-10 text-[#8A38F5]" />
      <h3 className="font-bold">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-md">{description}</p>}
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-3 px-5 py-2 rounded-lg bg-[#8A38F5] text-white text-sm font-semibold hover:opacity-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
