import { BiBriefcase, BiBuildings } from "react-icons/bi";
import { MdOutlineStorefront, MdPeople } from "react-icons/md";
import { FiFileText, FiBriefcase } from "react-icons/fi";

// DB column mapping:
// businessType       → Business Type (Proprietorship / Partnership / Private Limited / Freelancer)
// businessName       → Business Name
// businessVintage    → Business Vintage (Years) — int
// annualTurnover     → Annual Turnover (decimal)
// monthlyNetIncome   → Monthly Net Income (decimal)
// existingLoanEMI    → Existing Loan EMI (decimal, optional)
// gstRegistered      → 1 / 0
// itrFiled           → 1 / 0
// businessSector     → optional sector tag
// yearIncome / monthIncome / ongoingEmi → used for Job side only

export default function Step2Income({ formData, setFormData, fieldRefs, incomeType }) {
  const labelClass = "text-sm font-bold text-gray-800";
  const inputClass =
    "w-full border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5] bg-white";
  const cardBorder =
    "bg-white p-4 sm:p-6 border border-[#E8E8E8] rounded-2xl space-y-5 shadow-sm";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const businessTypes = [
    { label: "Proprietorship", icon: <MdOutlineStorefront size={28} /> },
    { label: "Partnership",    icon: <MdPeople size={28} /> },
    { label: "Private Limited",icon: <FiFileText size={28} /> },
    { label: "Freelancer",     icon: <FiBriefcase size={28} /> },
  ];

  return (
    <div className="space-y-4">

      {/* ══════════════ JOB SECTION ══════════════ */}
      {incomeType === "Job" && (
        <div className={cardBorder}>
          {/* Header */}
          <div className="flex items-center gap-3 pb-1">
            <div className="w-10 h-10 rounded-xl bg-[#F3EAFF] flex items-center justify-center">
              <BiBriefcase size={20} className="text-[#8A38F5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Income Details</h3>
              <p className="text-xs text-gray-400">Tell us about your job and income</p>
            </div>
          </div>

          {/* Employment Sector → employmentSector */}
          <div>
            <label className={labelClass}>Employment Sector</label>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Private", "Government", "Proprietorship"].map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all
                    ${formData.employmentSector === item
                      ? "border-[#8A38F5] bg-[#F3EAFF] text-[#8A38F5]"
                      : "border-[#E0E0E0] text-gray-600 bg-white"}`}
                >
                  <input
                    type="radio"
                    name="employmentSector"
                    ref={(el) => (fieldRefs.current.employmentSector = el)}
                    value={item}
                    checked={formData.employmentSector === item}
                    onChange={handleChange}
                    className="accent-[#8A38F5] w-4 h-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Work Experience → workexperienceYear + workexperienceMonth */}
          <div>
            <label className={labelClass}>Work Experience</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="relative">
                <input
                  name="workexperienceYear"
                  value={formData.workexperienceYear}
                  ref={(el) => (fieldRefs.current.workexperienceYear = el)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      workexperienceYear: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className={inputClass}
                  placeholder="Years"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">e.g. 2</span>
              </div>
              <div className="relative">
                <input
                  name="workexperienceMonth"
                  value={formData.workexperienceMonth}
                  ref={(el) => (fieldRefs.current.workexperienceMonth = el)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      workexperienceMonth: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  className={inputClass}
                  placeholder="Months"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">e.g. 6</span>
              </div>
            </div>
          </div>

          {/* Salary Type → salaryType */}
          <div>
            <label className={labelClass}>Salary Type</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { value: "Account Transfer", label: "Bank Transfer",  sub: "Salary credited in bank" },
                { value: "Cash",             label: "Cash Salary",    sub: "Salary received in cash" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.salaryType === item.value
                      ? "border-[#8A38F5] bg-[#F3EAFF]"
                      : "border-[#E0E0E0] bg-white"}`}
                >
                  <input
                    type="radio"
                    name="salaryType"
                    ref={(el) => (fieldRefs.current.salaryType = el)}
                    value={item.value}
                    checked={formData.salaryType === item.value}
                    onChange={handleChange}
                    className="accent-[#8A38F5] w-4 h-4 flex-shrink-0"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${formData.salaryType === item.value ? "text-[#8A38F5]" : "text-gray-700"}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-400">{item.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Monthly Salary → grossPay, netPay, pfDeduction */}
          <div>
            <label className={labelClass}>Monthly Salary (₹)</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { name: "grossPay",    placeholder: "Gross Salary" },
                { name: "netPay",      placeholder: "Net Salary" },
                { name: "pfDeduction", placeholder: "PF Deduction" },
              ].map((f) => (
                <div key={f.name} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input
                    name={f.name}
                    ref={(el) => (fieldRefs.current[f.name] = el)}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className={`${inputClass} pl-7 text-xs`}
                    placeholder={f.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other Income → otherIncome */}
          <div>
            <label className={labelClass}>Other Income (Optional)</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { value: "Co-applicant",  label: "Co-applicant Income" },
                { value: "Rental Income", label: "Rental Income" },
                { value: "Other Income",  label: "Other Income" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 cursor-pointer text-center transition-all
                    ${formData.otherIncome === item.value
                      ? "border-[#8A38F5] bg-[#F3EAFF]"
                      : "border-[#E0E0E0] bg-white"}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                    ${formData.otherIncome === item.value ? "bg-[#8A38F5]" : "bg-gray-100"}`}>
                    <input
                      type="checkbox"
                      name="otherIncome"
                      ref={(el) => (fieldRefs.current.otherIncome = el)}
                      value={item.value}
                      checked={formData.otherIncome === item.value}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          otherIncome: prev.otherIncome === item.value ? "" : item.value,
                        }))
                      }
                      className="accent-white w-4 h-4"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Annual Income → yearIncome */}
          <div>
            <label className={labelClass}>Annual Income (as per ITR)</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                name="yearIncome"
                value={formData.yearIncome}
                ref={(el) => (fieldRefs.current.yearIncome = el)}
                onChange={handleChange}
                className={`${inputClass} pl-7`}
                placeholder="Enter annual income"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Enter your total annual income as per ITR.</p>
          </div>

          {/* Monthly Avg Balance → monthIncome */}
          <div>
            <label className={labelClass}>Monthly Avg. Balance</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                name="monthIncome"
                value={formData.monthIncome}
                ref={(el) => (fieldRefs.current.monthIncome = el)}
                onChange={handleChange}
                className={`${inputClass} pl-7`}
                placeholder="Enter Balance"
              />
            </div>
          </div>

          {/* Ongoing Loan EMI → ongoingEmi */}
          <div>
            <label className={labelClass}>Ongoing Loan EMI</label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
              <input
                name="ongoingEmi"
                value={formData.ongoingEmi}
                ref={(el) => (fieldRefs.current.ongoingEmi = el)}
                onChange={handleChange}
                className={`${inputClass} pl-7`}
                placeholder="Enter EMI"
              />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ BUSINESS SECTION ══════════════ */}
      {incomeType === "Business" && (
        <div className={cardBorder}>
          {/* Header */}
          <div className="flex items-center gap-3 pb-1">
            <div className="w-10 h-10 rounded-xl bg-[#F3EAFF] flex items-center justify-center">
              <BiBuildings size={20} className="text-[#8A38F5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Business Details</h3>
              <p className="text-xs text-gray-400">Tell us about your business</p>
            </div>
          </div>

          {/* 1. Business Type → businessType (DB: varchar 50) */}
          <div>
            <label className={`${labelClass} text-base`}>1. Business Type</label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {businessTypes.map((type) => (
                <label
                  key={type.label}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.businessType === type.label
                      ? "border-[#8A38F5] bg-[#F3EAFF] text-[#8A38F5]"
                      : "border-[#E0E0E0] bg-white text-gray-400"}`}
                >
                  <input
                    type="radio"
                    name="businessType"
                    ref={(el) => (fieldRefs.current.businessType = el)}
                    value={type.label}
                    checked={formData.businessType === type.label}
                    onChange={handleChange}
                    className="accent-[#8A38F5] w-4 h-4 self-start"
                  />
                  <span className={formData.businessType === type.label ? "text-[#8A38F5]" : "text-gray-400"}>
                    {type.icon}
                  </span>
                  <span className={`text-sm font-semibold ${formData.businessType === type.label ? "text-[#8A38F5]" : "text-gray-600"}`}>
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 2. Business Information */}
          <div className="space-y-3">
            <label className={`${labelClass} text-base`}>2. Business Information</label>

            {/* businessName → DB: businessName varchar(255) */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-base">
                <BiBuildings />
              </span>
              <input
                name="businessName"
                ref={(el) => (fieldRefs.current.businessName = el)}
                value={formData.businessName}
                onChange={handleChange}
                className={`${inputClass} pl-9`}
                placeholder="Enter business name"
              />
              {!formData.businessName && (
                <p className="text-xs text-red-500 mt-1">Business name is required</p>
              )}
            </div>

            {/* businessVintage → DB: businessVintage int */}
            <select
              name="businessVintage"
              ref={(el) => (fieldRefs.current.businessVintage = el)}
              value={formData.businessVintage}
              onChange={handleChange}
              className={`${inputClass} appearance-none ${!formData.businessVintage ? "text-gray-400" : "text-gray-800"}`}
            >
              <option value="">Select years</option>
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "year" : "years"}
                </option>
              ))}
            </select>
            {!formData.businessVintage && (
              <p className="text-xs text-red-500">Business vintage is required</p>
            )}
          </div>

          {/* 3. Financial Information */}
          <div className="space-y-3">
            <label className={`${labelClass} text-base`}>3. Financial Information</label>

            <div className="grid grid-cols-2 gap-3">
              {/* annualTurnover → DB: annualTurnover decimal(15,2) */}
              <div className="relative">
                <input
                  name="annualTurnover"
                  ref={(el) => (fieldRefs.current.annualTurnover = el)}
                  value={formData.annualTurnover}
                  onChange={handleChange}
                  className={`${inputClass} pr-8`}
                  placeholder="Annual Turnover (₹)"
                  type="number"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                {!formData.annualTurnover && (
                  <p className="text-xs text-red-500 mt-1">Annual turnover is required</p>
                )}
              </div>

              {/* monthlyNetIncome → DB: monthlyNetIncome decimal(15,2) */}
              <div className="relative">
                <input
                  name="monthlyNetIncome"
                  ref={(el) => (fieldRefs.current.monthlyNetIncome = el)}
                  value={formData.monthlyNetIncome}
                  onChange={handleChange}
                  className={`${inputClass} pr-8`}
                  placeholder="Monthly Net Income (₹)"
                  type="number"
                  min="0"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                {!formData.monthlyNetIncome && (
                  <p className="text-xs text-red-500 mt-1">Monthly net income is required</p>
                )}
              </div>
            </div>

            {/* existingLoanEMI → DB: existingLoanEMI decimal(15,2) optional */}
            <div className="relative">
              <input
                name="existingLoanEMI"
                value={formData.existingLoanEMI}
                onChange={handleChange}
                className={`${inputClass} pr-8`}
                placeholder="Existing Loan EMI (₹) (Optional)"
                type="number"
                min="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
            </div>
          </div>

          {/* 4. Compliance */}
          <div>
            <label className={`${labelClass} text-base`}>4. Compliance</label>
            <div className="grid grid-cols-2 gap-4 mt-3">

              {/* gstRegistered → DB: tinyint(1) → store 1/0 */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  GST REGISTERED? <span className="text-gray-400">ⓘ</span>
                </p>
                <div className="flex gap-4">
                  {[{ label: "Yes", val: 1 }, { label: "No", val: 0 }].map(({ label, val }) => (
                    <label key={label} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="gstRegistered"
                        value={val}
                        checked={Number(formData.gstRegistered) === val}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, gstRegistered: val }))
                        }
                        className="accent-[#8A38F5] w-4 h-4"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {/* itrFiled → DB: tinyint(1) → store 1/0 */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  ITR FILED? <span className="text-gray-400">ⓘ</span>
                </p>
                <div className="flex gap-4">
                  {[{ label: "Yes", val: 1 }, { label: "No", val: 0 }].map(({ label, val }) => (
                    <label key={label} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="itrFiled"
                        value={val}
                        checked={Number(formData.itrFiled) === val}
                        onChange={() =>
                          setFormData((prev) => ({ ...prev, itrFiled: val }))
                        }
                        className="accent-[#8A38F5] w-4 h-4"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 py-2">
        <span>🔒</span>
        <span>Your information is secure and encrypted</span>
      </div>
    </div>
  );
}