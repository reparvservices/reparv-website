import { useState } from "react";
import RERAVerificationResult from "./ReraVerificationResult";

export default function RegisteredProjects() {
  const [agreementValue] = useState(5250000);

  const [activeTab, setActiveTab] = useState("registered");
  const [filters, setFilters] = useState({
    project: "",
    pincode: "",
    date: "",
    state: "",
    division: "",
    district: "",
  });

  const safeAgreementValue = Number(agreementValue || 0);

  return (
    <>
      {/* ===============================
          RERA SEARCH SECTION
         =============================== */}
      <section className="">
        <div className="flex justify-center px-4">
          <div className="w-full max-w-md sm:max-w-3xl lg:max-w-6xl bg-white rounded-2xl shadow-[0_12px_40px_#8A38F529] p-5 sm:p-8 lg:p-12">
            {/* TABS */}
            <div className="flex gap-6 sm:gap-12 border-b border-[#E5E5E5] mb-6 sm:mb-8">
              {["registered", "revoked"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 sm:pb-3 text-sm sm:text-lg font-semibold capitalize ${
                    activeTab === tab
                      ? "text-[#7C3AED] border-b-2 sm:border-b-4 border-[#7C3AED]"
                      : "text-black"
                  }`}
                >
                  {tab} Projects
                </button>
              ))}
            </div>

            {/* FILTER FORM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-6">
              <Input
                label="Project Name or MahaRERA Number"
                placeholder="Enter Project name or Number"
                value={filters.project}
                onChange={(v) => setFilters({ ...filters, project: v })}
              />

              <Input
                label="Pincode"
                placeholder="Enter Pincode"
                value={filters.pincode}
                onChange={(v) => setFilters({ ...filters, pincode: v })}
              />

              <Input
                label="Date"
                placeholder="dd/mm/yy"
                value={filters.date}
                onChange={(v) => setFilters({ ...filters, date: v })}
              />

              <Select
                label="State"
                value={filters.state}
                onChange={(v) => setFilters({ ...filters, state: v })}
              />

              <Select
                label="Division"
                value={filters.division}
                onChange={(v) => setFilters({ ...filters, division: v })}
              />

              <Select
                label="District"
                value={filters.district}
                onChange={(v) => setFilters({ ...filters, district: v })}
              />
            </div>

            {/* SEARCH BUTTON */}
            <div className="flex justify-center mt-8 sm:mt-10">
              <button className="w-full sm:max-w-xl h-[50px] sm:h-[56px] bg-[#7C3AED] text-white text-base sm:text-lg font-semibold rounded-xl shadow-[0_8px_20px_#8A38F529] hover:opacity-95 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          RERA RESULT HEADING
         =============================== */}
      <section className="bg-white py-6 sm:py-10">
        <h2 className="text-center text-xl sm:text-4xl lg:text-5xl font-bold text-[#3F2D62] px-4">
          RERA Verification Result
        </h2>
      </section>

      {/* ===============================
          RERA RESULT CARDS
         =============================== */}
      <RERAVerificationResult
        data={{ emi: safeAgreementValue }}
        loanAmount={safeAgreementValue}
        activeTab={activeTab}
        filters={filters}
      />
    </>
  );
}

/* ===============================
   REUSABLE INPUTS (MOBILE FRIENDLY)
   =============================== */

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[48px] sm:h-[52px] rounded-lg border border-[#E5E5E5] px-4 text-sm focus:outline-none focus:border-[#7C3AED]"
      />
    </div>
  );
}

function Select({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-semibold mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[48px] sm:h-[52px] rounded-lg border border-[#E5E5E5] px-4 text-sm bg-white focus:outline-none focus:border-[#7C3AED]"
      >
        <option value="">Select</option>
      </select>
    </div>
  );
}
