"use client"

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../store/auth";
import { FaPlus, FaSearch, FaCalculator, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiBankLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import DataTable from "react-data-table-component";

// The `approved` column tracks where an application stands for the customer
const APPROVAL_STYLES = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  "Not Approved": "bg-red-100 text-red-600",
};

const STATUS_FILTERS = ["All", "In Progress", "Approved", "Not Approved"];

const formatId = (id) => (id ? `#HL-${String(id).padStart(4, "0")}` : "");

const formatRupees = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? `₹${n.toLocaleString("en-IN")}` : String(value);
};

const formatDuration = (years, months) =>
  years || months ? `${years || 0} Years ${months || 0} Months` : null;

function ApprovalBadge({ value }) {
  const label = value || "In Progress";
  return (
    <span
      className={`${
        APPROVAL_STYLES[label] || "bg-gray-100 text-gray-700"
      } inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap`}
    >
      {label}
    </span>
  );
}

export default function HomeLoan() {
  const router = useRouter();
  const pathname = usePathname();
  const { URI } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loanApplications, setLoanApplications] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [application, setApplication] = useState({});
  const [showEMIPopup, setShowEMIPopup] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/user/emi/loan-applications", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch loan applications.");
      const data = await response.json();
      setLoanApplications(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching :", err);
    } finally {
      setLoaded(true);
    }
  };

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

  const counts = useMemo(() => {
    const byApproval = (label) =>
      loanApplications.filter((a) => (a.approved || "In Progress") === label).length;
    return {
      total: loanApplications.length,
      inProgress: byApproval("In Progress"),
      approved: byApproval("Approved"),
      notApproved: byApproval("Not Approved"),
    };
  }, [loanApplications]);

  const filteredData = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return loanApplications.filter((item) => {
      const approval = item.approved || "In Progress";
      const matchesStatus = statusFilter === "All" || approval === statusFilter;
      const matchesSearch =
        !search ||
        formatId(item.id).toLowerCase().includes(search) ||
        item.id?.toString().includes(search) ||
        item.employmentType?.toLowerCase().includes(search) ||
        approval.toLowerCase().includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [loanApplications, searchTerm, statusFilter]);

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
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#F9FAFB",
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
      format: (row) => formatId(row.id),
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Employment Type",
      selector: (row) => row.employmentType,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Date Applied",
      selector: (row) => row.created_at,
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Application Status",
      cell: (row) => <ApprovalBadge value={row.approved} />,
      minWidth: "160px",
    },
    {
      name: "",
      cell: (row) => (
        <button
          className="bg-[#F6F1FF] text-[#7C3AED] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#EDE3FF]"
          onClick={() => fetchById(row.id)}
        >
          View Details
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

  // On the standalone mobile page, move to the dashboard tab on md and above
  useEffect(() => {
    if (pathname?.startsWith("/dashboard")) return;
    const media = window.matchMedia("(min-width: 768px)");
    const redirectIfDesktop = () => {
      if (media.matches) router.replace("/dashboard?tab=home-loan");
    };
    redirectIfDesktop();
    media.addEventListener("change", redirectIfDesktop);
    return () => media.removeEventListener("change", redirectIfDesktop);
  }, [router, pathname]);

  const hasApplications = loanApplications.length > 0;

  return (
    <div className="w-full min-h-screen md:min-h-0 md:bg-white p-4 md:p-6 md:rounded-2xl md:shadow-sm">
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
        <button
          onClick={() => router.push("/home-loan-application")}
          className="px-4 py-2 text-xs bg-[#7C3AED] text-white rounded-lg shadow-md font-semibold active:scale-98"
        >
          Apply
        </button>
      </div>

      <div className="hidden md:flex gap-4 justify-between items-start lg:items-center mb-6 pb-4 border-b border-b-[#D9D9D9]">
        <div>
          <h1 className="text-2xl font-bold">Home Loan</h1>
          <p className="text-sm text-gray-500">
            Track your loan applications and manage your home financing journey
          </p>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/emi-calculator")}
            className="flex items-center gap-2 border border-[#5323DC] text-[#5323DC] px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#F6F1FF] active:scale-98"
          >
            <FaCalculator /> EMI Calculator
          </button>
          <button
            type="button"
            onClick={() => router.push("/home-loan-application")}
            className="flex items-center gap-2 bg-[#7C3AED] text-white px-4 py-2.5 rounded-lg shadow-md font-semibold text-sm hover:opacity-95 active:scale-98"
          >
            <FaPlus /> Apply for Home Loan
          </button>
        </div>
      </div>

      {!loaded ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
          <div className="h-64 rounded-xl bg-gray-100 animate-pulse" />
        </div>
      ) : !hasApplications ? (
        /* ================= EMPTY STATE ================= */
        <div className="py-12 flex flex-col items-center text-center gap-3 border border-dashed border-[#D9D9D9] rounded-2xl px-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED]">
            <RiBankLine size={30} />
          </div>
          <h2 className="text-lg font-bold">No loan applications yet</h2>
          <p className="text-sm text-gray-500 max-w-md">
            Apply once and get offers from partner banks. Check how much EMI you can
            afford before you apply.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              onClick={() => router.push("/home-loan-application")}
              className="flex items-center justify-center gap-2 bg-[#7C3AED] text-white px-5 py-2.5 rounded-lg font-semibold text-sm"
            >
              <FaPlus /> Apply for Home Loan
            </button>
            <button
              onClick={() => router.push("/emi-calculator")}
              className="flex items-center justify-center gap-2 border border-[#5323DC] text-[#5323DC] px-5 py-2.5 rounded-lg font-semibold text-sm"
            >
              <FaCalculator /> EMI Calculator
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* ================= STATS (click to filter) ================= */}
          <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-6">
            <StatCard
              icon={<HiOutlineClipboardList />}
              title="Total Applications"
              value={counts.total}
              active={statusFilter === "All"}
              onClick={() => setStatusFilter("All")}
            />
            <StatCard
              icon={<MdOutlinePendingActions />}
              title="In Progress"
              value={counts.inProgress}
              active={statusFilter === "In Progress"}
              onClick={() => setStatusFilter("In Progress")}
            />
            <StatCard
              icon={<FaCheckCircle />}
              title="Approved"
              value={counts.approved}
              active={statusFilter === "Approved"}
              onClick={() => setStatusFilter("Approved")}
            />
            <StatCard
              icon={<FaTimesCircle />}
              title="Not Approved"
              value={counts.notApproved}
              active={statusFilter === "Not Approved"}
              onClick={() => setStatusFilter("Not Approved")}
            />
          </div>

          {/* ================= TABLE (desktop) ================= */}
          <div className="hidden md:block bg-white rounded-xl border border-[#D9D9D9] p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold">
                {statusFilter === "All" ? "All Applications" : `${statusFilter} Applications`}
              </h2>

              <label className="flex items-center gap-2 border border-[#D9D9D9] rounded-lg px-3 py-2 text-sm text-gray-500 focus-within:border-[#8A38F5]">
                <FaSearch />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID or type"
                  className="outline-none w-full lg:w-48 text-gray-800"
                />
              </label>
            </div>

            <DataTable
              columns={columns}
              data={filteredData}
              customStyles={customStyles}
              pagination
              paginationPerPage={10}
              highlightOnHover
              responsive
              noDataComponent={
                <p className="py-8 text-sm text-gray-500">No applications match your filters.</p>
              }
            />
          </div>

          {/* ================= CARDS (mobile) ================= */}
          <div className="md:hidden space-y-4 pb-10">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    statusFilter === status
                      ? "bg-[#5323DC] text-white border-[#5323DC]"
                      : "bg-white text-gray-600 border-[#D9D9D9]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {filteredData.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">
                No applications match your filters.
              </p>
            )}

            {filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#D9D9D9] p-5"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-semibold text-sm">{formatId(item?.id)}</p>
                    <p className="text-gray-500 text-sm">{item?.employmentType}</p>
                  </div>
                  <ApprovalBadge value={item?.approved} />
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Applied on <span className="font-semibold text-gray-800">{item?.created_at}</span>
                </p>

                <button
                  onClick={() => fetchById(item?.id)}
                  className="mt-4 w-full bg-[#F6F1FF] text-[#7C3AED] font-semibold py-3 rounded-xl"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= DETAILS POPUP ================= */}
      {showEMIPopup && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowEMIPopup(false)}
          className="w-full h-screen bg-[#000000a2] fixed inset-0 z-50 flex md:items-center md:justify-center"
        >
          <div className="bg-white w-full md:w-[700px] lg:w-[800px] max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-6 absolute bottom-0 md:static">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Loan Application {formatId(application?.id)}</h2>
                {application?.created_at && (
                  <p className="text-sm text-gray-500">Applied on {application.created_at}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <ApprovalBadge value={application?.approved} />
                <button
                  onClick={() => setShowEMIPopup(false)}
                  aria-label="Close"
                  className="text-gray-500 hover:text-black text-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <DetailSection title="Applicant">
              <InfoRow label="Full Name" value={application?.fullname} />
              <InfoRow label="Contact No" value={application?.contactNo} />
              <InfoRow label="Email" value={application?.email} />
              <InfoRow label="Date of Birth" value={application?.dateOfBirth} />
              <InfoRow label="City" value={application?.city} />
              <InfoRow label="State" value={application?.state} />
              <InfoRow label="Pincode" value={application?.pincode} />
            </DetailSection>

            <DetailSection title="Employment">
              <InfoRow label="Employment Type" value={application?.employmentType} />
              <InfoRow label="Employment Sector" value={application?.employmentSector} />
              <InfoRow
                label="Work Experience"
                value={formatDuration(application?.workexperienceYear, application?.workexperienceMonth)}
              />
              <InfoRow label="Business Sector" value={application?.businessSector} />
              <InfoRow label="Business Category" value={application?.businessCategory} />
              <InfoRow
                label="Business Experience"
                value={formatDuration(
                  application?.businessExperienceYears,
                  application?.businessExperienceMonths,
                )}
              />
            </DetailSection>

            <DetailSection title="Income & Obligations">
              <InfoRow label="Salary Type" value={application?.salaryType} />
              <InfoRow label="Gross Pay" value={formatRupees(application?.grossPay)} />
              <InfoRow label="Net Pay" value={formatRupees(application?.netPay)} />
              <InfoRow label="Monthly Income" value={formatRupees(application?.monthIncome)} />
              <InfoRow label="Yearly Income" value={formatRupees(application?.yearIncome)} />
              <InfoRow label="Other Income" value={formatRupees(application?.otherIncome)} />
              <InfoRow
                label="Business Other Income"
                value={formatRupees(application?.businessOtherIncome)}
              />
              <InfoRow label="Ongoing EMI" value={formatRupees(application?.ongoingEmi)} />
            </DetailSection>

            <button
              onClick={() => setShowEMIPopup(false)}
              className="mt-2 w-full bg-[#7C3AED] text-white py-3 rounded-xl font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, title, value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-xl p-3 sm:p-4 flex gap-3 items-center text-left transition ${
        active ? "border-[#7C3AED] bg-[#FAF7FF]" : "border-[#D9D9D9] bg-white hover:border-[#7C3AED]"
      }`}
    >
      <div className="w-10 h-10 shrink-0 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#7C3AED] text-lg">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] sm:text-xs text-gray-500 truncate">{title}</p>
        <h3 className="text-lg sm:text-xl font-bold">{value}</h3>
      </div>
    </button>
  );
}

function DetailSection({ title, children }) {
  // Hide the whole section when none of its rows have a value
  const rows = (Array.isArray(children) ? children : [children]).filter(
    (child) => child?.props?.value !== null && child?.props?.value !== undefined && child?.props?.value !== "",
  );
  if (rows.length === 0) return null;

  return (
    <section className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#7C3AED] mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">{rows}</div>
    </section>
  );
}

const InfoRow = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;

  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-right break-all">{value}</span>
    </div>
  );
};
