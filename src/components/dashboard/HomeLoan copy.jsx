import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineTimeline } from "react-icons/md";
import { FaFilePdf, FaCheckCircle } from "react-icons/fa";
import {
  IoArrowBack,
  IoNotificationsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

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
  const navigate = useNavigate();
  // Redirect to dashboard on md and above
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        navigate("/dashboard");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);
  return (
    <div className="w-full min-h-screen md:bg-white p-4 md:p-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white flex md:hidden items-center justify-between mb-6">
        <IoArrowBack
          size={22}
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer"
        />
        <h2 className="text-base font-bold">Home Loan</h2>
        <div className="px-4 py-2 text-xs bg-[#7C3AED] text-white rounded-lg shadow-md font-semibold">
          Apply
        </div>
      </div>

      <div className="hidden md:flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Home Loan Dashboard</h1>
          <p className="text-sm text-gray-500">
            Track your loan applications and manage your home financing journey
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#7C3AED] text-white px-6 py-3 rounded-lg shadow-md font-semibold text-sm">
          <FaPlus /> Apply for Home Loan
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
        <StatCard
          icon={<HiOutlineClipboardList />}
          title="Total Applications"
          value="08"
        />
        <StatCard icon={<FaFileAlt />} title="Active Loans" value="08" />
        <StatCard
          icon={<FaRupeeSign />}
          title="Approved Amount"
          value="₹6.6 Cr"
        />
        <StatCard icon={<FaClock />} title="Processing Time" value="20 Days" />
      </div>

      {/* ================= TABLE (LEFT) + TIMELINE (RIGHT) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-8">
        {/* ================= APPLICATION PROGRESS ================= */}
        <div className="col-span-1 md:col-span-2 rounded-xl">
          <div className="border border-[#D9D9D9] rounded-xl p-4 sm:p-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
              <h2 className="text-base md:text-lg font-semibold">
                Current Application Progress
              </h2>
              <span className="text-[10px] sm:text-xs text-gray-400">
                Application ID: #HL-2024-0847
              </span>
            </div>

            {/* Progress bar */}
            <div className="hidden md:block mb-4 md:mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Overall Progress</span>
                <span className="text-[#7C3AED] font-semibold">76%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-[#7C3AED] rounded-full w-[76%]" />
              </div>
            </div>

            {/* Stepper */}
            <div className="flex gap-2 md:gap-0 flex-col md:flex-row items-center justify-between relative">
              <div className="hidden md:block absolute top-4 left-0 right-0 h-[2px] bg-gray-200" />
              <div className="hidden md:block absolute top-4 left-0 w-[76%] h-[2px] bg-[#7C3AED]" />

              {[
                "Application Submitted",
                "Document Verification",
                "Credit Assessment",
                "Property Valuation",
                "Final Approval",
              ].map((label, i) => (
                <div
                  key={i}
                  className="relative flex gap-4 flex-row md:flex-col items-center z-10 md:text-center w-full"
                >
                  <div
                    className={`w-8 h-8 md:mx-auto rounded-full flex items-center justify-center text-white text-sm ${
                      i < 4 ? "bg-[#7C3AED]" : "bg-gray-300"
                    }`}
                  >
                    <FaCheck />
                  </div>
                  <div>
                    <p
                      className={`mt-2 text-base md:text-xs md:mx-2 break-words ${
                        i === 3 ? "text-[#7C3AED] font-bold" : "text-black"
                      }`}
                    >
                      {label}
                    </p>
                    <span className="text-sm md:text-[11px] text-gray-400">
                      Jan 15, 2024
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== LEFT : TABLE ===== */}
          <div className="hidden md:block bg-white rounded-xl border border-[#D9D9D9] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Loan Applications</h2>

              <div className="flex items-center gap-2 border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm text-gray-500">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search Application..."
                  className="outline-none w-48"
                />
              </div>
            </div>

            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="py-3">Application ID</th>
                  <th>Property</th>
                  <th>Loan Amount</th>
                  <th>Status</th>
                  <th>Date Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { status: "In Progress", color: "bg-blue-100 text-blue-600" },
                  { status: "Approved", color: "bg-green-100 text-green-600" },
                  { status: "Rejected", color: "bg-red-100 text-red-500" },
                  {
                    status: "Under Review",
                    color: "bg-yellow-100 text-yellow-600",
                  },
                ].map((item, i) => (
                  <tr key={i} className="border-b last:border-b-0">
                    <td className="py-4 text-gray-500">#HL-2024-0847</td>
                    <td className="text-gray-500">123 Oak Street, D....</td>
                    <td className="font-semibold">₹450,000</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.color}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-gray-500">Jan 15, 2024</td>
                    <td>
                      <button className="text-[#7C3AED] font-medium">
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== RIGHT : TIMELINE ===== */}
        <div className="space-y-4 sm:space-y-6 pb-4 sm:pb-10">
          <div className="border border-[#D9D9D9] rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">
              Recent Activity Timeline
            </h2>

            <TimelineItem
              color="bg-green-100 text-green-600"
              title="Credit Check Completed"
              desc="Your credit score has been verified successfully"
              time="2 hours ago"
            />
            <TimelineItem
              color="bg-blue-100 text-blue-600"
              title="Documents Verified"
              desc="All submitted documents have been approved"
              time="1 day ago"
            />
            <TimelineItem
              color="bg-purple-100 text-purple-600"
              title="Documents Uploaded"
              desc="Income proof and ID documents submitted"
              time="3 days ago"
            />
            <TimelineItem
              color="bg-yellow-100 text-yellow-600"
              title="Application Started"
              desc="New home loan application initiated"
              time="5 days ago"
            />
          </div>

          {/* ================= DOCUMENTS + CALCULATOR ================= */}

          <div className="bg-white border border-[#D9D9D9] rounded-xl p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Document Upload</h3>

            <DocumentItem
              title="Income Proof"
              status="Verified"
              color="green"
            />
            <DocumentItem
              title="ID Documents"
              status="Verified"
              color="green"
            />
            <DocumentItem
              title="Property Documents"
              status="Under Review"
              color="yellow"
            />

            <button className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-sm text-gray-500 hover:bg-gray-50">
              <FaUpload /> Upload More Documents
            </button>
          </div>

          <div className="hidden md:block bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] rounded-xl p-6 text-white">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold">Loan Calculator</h3>
              <FaCalculator />
            </div>

            <p className="text-sm text-purple-100 mb-4">
              Calculate your monthly EMI and plan your finances
            </p>

            <button className="w-full bg-white text-[#7C3AED] font-semibold py-3 rounded-lg">
              Calculate EMI
            </button>
          </div>

          <div className="md:hidden bg-[white] space-y-4 py-4">
            <h2 className="text-xl font-semibold mb-4">
              All Loan Applications
            </h2>

            {loanApplications.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-5"
              >
                {/* Top Row */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{item.id}</p>
                    <p className="text-gray-500 text-sm">{item.type}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${item.statusStyle}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Middle Info */}
                <div className="flex justify-between mt-5">
                  <div>
                    <p className="text-sm font-semibold">Loan Amount</p>
                    <p className="font-bold mt-1">{item.amount}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">Date Applied</p>
                    <p className="text-gray-500 mt-1">{item.date}</p>
                  </div>
                </div>

                {/* Button */}
                <button className="mt-5 w-full bg-[#F6F1FF] text-[#7C3AED] font-semibold py-3 rounded-xl">
                  View Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          <span className="text-[8px] sm:text-xs text-green-500">↑ 12%</span>
        </div>
      </div>
    </div>
  );
}

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
