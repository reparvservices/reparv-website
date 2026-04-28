export default function Step2Income({ formData, setFormData, fieldRefs }) {
  // 🔹 Design variables (reuse everywhere)
  const labelClass =
    "text-sm font-semibold text-gray-700";

  const inputClass =
    "w-full border border-[#D9D9D9] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5]";

  const radioWrapper =
    "flex items-center gap-2 cursor-pointer text-sm";

  const cardBorder =
    "bg-white p-4 sm:p-6 border border-[#B8B8B8] rounded-xl space-y-6";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={cardBorder}>
      <div className="flex flex-col sm:flex-row justify-between gap-4" >
        <h3 className="font-bold text-xl">Income details</h3>
      <span className="text-xs text-red-500">All fields required</span>
      </div>
      {/* Employment Sector */}
      <div>
        <label className={labelClass}>Employment Sector</label>
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-2">
          {["Private", "Government", "Proprietorship"].map((item) => (
            <label key={item} className={radioWrapper}>
              <input
                type="radio"
                name="employmentSector"
                ref={(el) => (fieldRefs.current.employmentSector = el)}
                value={item}
                checked={formData.employmentSector === item}
                onChange={handleChange}
                className="accent-[#8A38F5]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <label className={labelClass}>Work Experience</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
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
        </div>
      </div>

      {/* Salary Type */}
      <div>
        <label className={labelClass}>Salary Type</label>
        <div className="flex gap-6 mt-2">
          {["Account Transfer", "Cash"].map((item) => (
            <label key={item} className={radioWrapper}>
              <input
                type="radio"
                name="salaryType"
                ref={(el) => (fieldRefs.current.salaryType = el)}
                value={item}
                checked={formData.salaryType === item}
                onChange={handleChange}
                className="accent-[#8A38F5]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Salary Details */}
      <div>
        <label className={labelClass}>Salary Details</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <input
            name="grossPay"
            ref={(el) => (fieldRefs.current.grossPay = el)}
            value={formData.grossPay}
            onChange={handleChange}
            className={inputClass}
            placeholder="Gross Pay"
          />
          <input
            name="netPay"
            ref={(el) => (fieldRefs.current.netPay = el)}
            value={formData.netPay}
            onChange={handleChange}
            className={inputClass}
            placeholder="Net Pay"
          />
          <input
            name="pfDeduction"
            ref={(el) => (fieldRefs.current.pfDeduction = el)}
            value={formData.pfDeduction}
            onChange={handleChange}
            className={inputClass}
            placeholder="PF Deduction"
          />
        </div>
      </div>

      {/* Other Income */}
      <div>
        <label className={labelClass}>Other Income</label>
        <div className="flex flex-wrap gap-4 sm:gap-6 mt-2">
          {["Co-applicant", "Rental Income", "Other Income"].map((item) => (
            <label key={item} className={radioWrapper}>
              <input
                type="radio"
                name="otherIncome"
                ref={(el) => (fieldRefs.current.otherIncome = el)}
                value={item}
                checked={formData.otherIncome === item}
                onChange={handleChange}
                className="accent-[#8A38F5]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Income Fields */}
      <input
        name="yearIncome"
        value={formData.yearIncome}
        ref={(el) => (fieldRefs.current.yearIncome = el)}
        onChange={handleChange}
        className={inputClass}
        placeholder="Yearly Income Details (as per ITR)"
      />
      <input
        name="monthIncome"
        value={formData.monthIncome}
        ref={(el) => (fieldRefs.current.monthIncome = el)}
        onChange={handleChange}
        className={inputClass}
        placeholder="Monthly Avg. (Bank Statement)"
      />
      <input
        name="ongoingEmi"
        value={formData.ongoingEmi}
        ref={(el) => (fieldRefs.current.ongoingEmi = el)}
        onChange={handleChange}
        className={inputClass}
        placeholder="Ongoing Loan EMI (if any)"
      />
    </div>
  );
}