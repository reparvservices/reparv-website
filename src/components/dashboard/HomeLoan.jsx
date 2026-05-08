"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import {
  FaPlus,
  FaFileAlt,
  FaClock,
  FaRupeeSign,
  FaCheck,
  FaSearch,
  FaUpload,
  FaCalculator,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineTimeline } from "react-icons/md";
import { FaFilePdf, FaCheckCircle } from "react-icons/fa";
import {
  IoArrowBack,
  IoNotificationsOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import DataTable from "react-data-table-component";

const loanApplications = [
  {
    id: "#HL-2024-0847",
    type: "Home Purchase Loan",
    amount: "₹450,000",
    status: "In Progress",
    statusStyle: "bg-blue-100 text-blue-600",
    date: "Jan 15, 2024",
  },
  {
    id: "#HL-2024-0848",
    type: "Home Purchase Loan",
    amount: "₹620,000",
    status: "Approved",
    statusStyle: "bg-green-100 text-green-600",
    date: "Jan 18, 2024",
  },
  {
    id: "#HL-2024-0849",
    type: "Home Purchase Loan",
    amount: "₹380,000",
    status: "Rejected",
    statusStyle: "bg-red-100 text-red-500",
    date: "Jan 20, 2024",
  },
];

export default function HomeLoan() {
  const router = useRouter();
  const { URI } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const [loanApplications, setLoanApplications] = useState([]);
  const [counts, setCounts] = useState({});
  const [application, setApplication] = useState({});
  const [showEMIPopup, setShowEMIPopup] = useState(false);

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/user/emi/loan-applications", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch loan applications.");
      const data = await response.json();
      console.log(data);
      setLoanApplications(data.data);
      setCounts(data.counts);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchById = async (id) => {
    try {
      const response = await fetch(
        URI + `/user/emi/loan-applications/get/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch loan application.");
      const data = await response.json();

      setApplication(data);
      setShowEMIPopup(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const filteredData = loanApplications?.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.id?.toString().includes(search) ||
      item.employmentType?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search);

    return matchesSearch;
  });

  const customStyles = {
    rows: {
      style: {
        padding: "5px 0px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
      },
    },
    headCells: {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#F9FAFB",
        backgroundColor: "#00000007",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#1F2937",
      },
    },
  };

  const columns = [
    {
      name: "Application ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      minWidth: "150px",
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`${
            row.status === "Inactive"
              ? "bg-blue-100 text-blue-600"
              : row.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-black"
          } px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {row.status}
        </span>
      ),
      minWidth: "150px",
    },
    {
      name: "Loan Type",
      selector: (row) => row.employmentType,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Date Applied",
      selector: (row) => row.created_at,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Approved",
      cell: (row) => (
        <span
          className={`${
            row.approved === "In Progress"
              ? "bg-yellow-100 text-yellow-600"
              : row.approved === "Approved"
              ? "bg-green-100 text-green-600"
              : row.approved === "Not Approved"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-black"
          } px-3 py-1 rounded-full text-xs font-semibold`}
        >
          {row.approved}
        </span>
      ),
      minWidth: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="bg-[#F6F1FF] text-[#7C3AED] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer"
          onClick={() => {
            fetchById(row.id);
          }}
        >
          View Detail
        </button>
      ),
      width: "150px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    fetchData();
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
    <div className="w-full min-h-screen md:bg-white p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white flex md:hidden items-center justify-between mb-6">
        <IoArrowBack
          size={22}
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer"
        />
        <h2 className="text-base font-bold">Home Loan</h2>
        <div onClick={()=> router.push("/home-loan-application")} className="px-4 py-2 text-xs bg-[#7C3AED] text-white rounded-lg shadow-md font-semibold cursor-pointer active:scale-98">
          Apply
        </div>
      </div>

      <div className="hidden md:flex gap-2 justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Home Loan Dashboard</h1>
          <p className="text-sm text-gray-500">
            Track your loan applications and manage your home financing journey
          </p>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={()=> router.push("/emi-calculator")} className="flex items-center gap-2 bg-[#5323DC] text-white p-2 xl:px-6 xl:py-3 rounded-lg shadow-md font-semibold text-sm cursor-pointer active:scale-98">
          <FaCalculator size={20} /> <span className="hidden xl:block">EMI Calculator</span>
        </button>
        
        <button type="button" onClick={()=> router.push("/home-loan-application")} className="flex items-center gap-2 bg-[#7C3AED] text-white px-6 py-3 rounded-lg shadow-md font-semibold text-sm cursor-pointer active:scale-98">
          <FaPlus /> Apply for Home Loan
        </button>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
        <StatCard
          icon={<HiOutlineClipboardList />}
          title="Total Applications"
          value={loanApplications?.length || "00"}
        />
        <StatCard icon={<FaFileAlt />} title="Active Loans" value={counts?.active || "00"} />
        <StatCard icon={<FaRupeeSign />} title="Approved" value={counts?.approved || "00"} />
        <StatCard icon={<MdOutlinePendingActions />} title="In Active Loans" value={counts?.inactive || "00"} />
      </div>

      {/* ================= TABLE (LEFT) + TIMELINE (RIGHT) ================= */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-8">
        <div className="col-span-1 rounded-xl">
          {/* ===== LEFT : TABLE ===== */}
          <div className="hidden md:block bg-white rounded-xl border border-[#D9D9D9] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Loan Applications</h2>

              <div className="flex items-center gap-2 border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm text-gray-500">
                <FaSearch />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Application..."
                  className="outline-none w-48"
                />
              </div>
            </div>

            <div className="overflow-scroll scrollbar-hide">
              <DataTable
                className="scrollbar-hide"
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                fixedHeader
                fixedHeaderScrollHeight="60vh"
                pagination
                paginationPerPage={15}
                highlightOnHover
                responsive
                paginationComponentOptions={{
                  rowsPerPageText: "Rows per page:",
                  rangeSeparatorText: "of",
                  selectAllRowsItem: true,
                  selectAllRowsItemText: "All",
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 pb-4 sm:pb-10">
          <div className="md:hidden bg-[white] space-y-4 py-4">
            <h2 className="text-xl font-semibold mb-4">
              All Loan Applications
            </h2>

            {loanApplications?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-5"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{item?.id}</p>
                    <p className="text-gray-500 text-sm">
                      {item?.employmentType}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${
                      item.status === "Inactive"
                        ? "bg-blue-100 text-blue-600"
                        : item.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {item?.status}
                  </span>
                </div>

                {/* Middle Info */}
                <div className="flex justify-between mt-5">
                  <div>
                    <p className="text-sm font-semibold">Loan Approved</p>
                    <p className="font-bold mt-1">{item?.approved}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">Date Applied</p>
                    <p className="text-gray-500 mt-1">{item?.created_at}</p>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    fetchById(item?.id);
                  }}
                  className="mt-5 w-full bg-[#F6F1FF] text-[#7C3AED] font-semibold py-3 rounded-xl cursor-pointer"
                >
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showEMIPopup && (
        <div className="Container w-full h-screen bg-[#000000a2] fixed inset-0 z-50 flex md:items-center md:justify-center">
          <div className="bg-white w-full md:w-[700px] lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-tr-2xl rounded-tl-2xl md:rounded-2xl p-6 absolute bottom-0 md:bottom-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold mb-6">EMI / Loan Details</h2>
              {/* Close */}
              <button
                onClick={() => setShowEMIPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {/* BASIC INFO */}
              <InfoRow label="Application ID" value={application?.id} />
              <InfoRow label="Full Name" value={application?.fullname} />
              <InfoRow label="Contact No" value={application?.contactNo} />
              <InfoRow label="Email" value={application?.email} />
              <InfoRow label="Date of Birth" value={application?.dateOfBirth} />

              {/* LOCATION */}
              <InfoRow label="City" value={application?.city} />
              <InfoRow label="State" value={application?.state} />
              <InfoRow label="Pincode" value={application?.pincode} />

              {/* EMPLOYMENT */}
              <InfoRow
                label="Employment Type"
                value={application?.employmentType}
              />
              <InfoRow
                label="Employment Sector"
                value={application?.employmentSector}
              />
              <InfoRow
                label="Work Experience"
                value={
                  application?.workexperienceYear ||
                  application?.workexperienceMonth
                    ? `${application?.workexperienceYear || 0} Years ${
                        application?.workexperienceMonth || 0
                      } Months`
                    : null
                }
              />

              {/* INCOME */}
              <InfoRow label="Salary Type" value={application?.salaryType} />
              <InfoRow label="Gross Pay" value={`₹ ${application?.grossPay}`} />
              <InfoRow label="Net Pay" value={`₹ ${application?.netPay}`} />
              <InfoRow
                label="Monthly Income"
                value={`₹ ${application?.monthIncome}`}
              />
              <InfoRow
                label="Yearly Income"
                value={`₹ ${application?.yearIncome}`}
              />
              <InfoRow label="Other Income" value={application?.otherIncome} />
              <InfoRow
                label="Ongoing EMI"
                value={`₹ ${application?.ongoingEmi}`}
              />

              {/* BUSINESS (ONLY IF EXISTS) */}
              <InfoRow
                label="Business Sector"
                value={application?.businessSector}
              />
              <InfoRow
                label="Business Category"
                value={application?.businessCategory}
              />
              <InfoRow
                label="Business Experience"
                value={
                  application?.businessExperienceYears ||
                  application?.businessExperienceMonths
                    ? `${application?.businessExperienceYears || 0} Years ${
                        application?.businessExperienceMonths || 0
                      } Months`
                    : null
                }
              />
              <InfoRow
                label="Business Other Income"
                value={application?.businessOtherIncome}
              />

              {/* STATUS */}
              {application?.status && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : application.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              )}

              {application?.approved && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Approved</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.approved === "Approved"
                        ? "bg-purple-100 text-purple-600"
                        : application.approved === "Not Approved"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {application.approved}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <button
              onClick={() => setShowEMIPopup(false)}
              className="mt-6 w-full bg-[#7C3AED] text-white py-3 rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="border border-[#D9D9D9] rounded-xl p-2 sm:p-4 flex gap-2 sm:gap-4 justify-between items-center">
      <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] text-lg">
        {icon}
      </div>
      <div className="w-full flex flex-col sm:gap-1">
        <p className="text-[10px] sm:text-xs text-gray-500">{title}</p>

        <div className="w-full flex items-center justify-between">
          <h3 className="text-sm sm:text-xl font-bold">{value}</h3>
          {/*<span className="text-[8px] sm:text-xs text-green-500">↑ 12%</span>*/}
        </div>
      </div>
    </div>
  );
}

const InfoRow = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-right break-all">{value}</span>
    </div>
  );
};

function TimelineItem({ title, desc, time, color }) {
  return (
    <div className="flex gap-3 mb-5">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center ${color}`}
      >
        <MdOutlineTimeline />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
        <span className="text-[11px] text-gray-400">{time}</span>
      </div>
    </div>
  );
}

/* ================= DOCUMENT ITEM ================= */
function DocumentItem({ title, status, color }) {
  const styles = {
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg mb-3 ${styles[color]}`}
    >
      <div className="flex items-center gap-3">
        <FaFilePdf className="text-2xl" />
        <div>
          <p className="font-medium">{title}</p>
          <span className="text-xs">{status}</span>
        </div>
      </div>
      {status === "Verified" && <FaCheckCircle />}
    </div>
  );
}
