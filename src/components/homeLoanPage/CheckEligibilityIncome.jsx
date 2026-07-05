import { BiBriefcase, BiBuildings } from "react-icons/bi";

const inputClass =
  "w-full border border-[#D9D9D9] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5] bg-white";
const labelClass = "text-sm font-bold text-gray-800";
const cardBorder =
  "bg-white p-4 sm:p-6 border border-[#E8E8E8] rounded-2xl space-y-5 shadow-sm";

function RadioPills({ name, options, value, onChange, fieldRef }) {
  return (
    <div className="flex flex-wrap gap-3 mt-2">
      {options.map((item) => (
        <label
          key={item}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all ${
            value === item
              ? "border-[#8A38F5] bg-[#F3EAFF] text-[#8A38F5]"
              : "border-[#E0E0E0] text-gray-600 bg-white"
          }`}
        >
          <input
            type="radio"
            name={name}
            ref={fieldRef}
            value={item}
            checked={value === item}
            onChange={onChange}
            className="accent-[#8A38F5] w-4 h-4"
          />
          {item}
        </label>
      ))}
    </div>
  );
}

function MoneyInput({ name, value, onChange, placeholder, fieldRef }) {
  return (
    <div className="relative mt-2">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
        ₹
      </span>
      <input
        name={name}
        ref={fieldRef}
        value={value}
        onChange={onChange}
        className={`${inputClass} pl-7`}
        placeholder={placeholder}
      />
    </div>
  );
}

export default function CheckEligibilityIncome({
  formData,
  setFormData,
  fieldRefs,
  incomeType,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      {incomeType === "Job" ? (
        <div className={cardBorder}>
          <div className="flex items-center gap-3 pb-1">
            <div className="w-10 h-10 rounded-xl bg-[#F3EAFF] flex items-center justify-center">
              <BiBriefcase size={20} className="text-[#8A38F5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Income Details</h3>
              <p className="text-xs text-gray-400">Tell us about your job and income</p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Employment Sector</label>
            <RadioPills
              name="employmentSector"
              options={["Private", "Government", "Proprietorship"]}
              value={formData.employmentSector}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.employmentSector = el;
              }}
            />
          </div>

          <div>
            <label className={labelClass}>Work Experience</label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <input
                name="workexperienceYear"
                ref={(el) => {
                  fieldRefs.current.workexperienceYear = el;
                }}
                value={formData.workexperienceYear}
                onChange={handleChange}
                className={inputClass}
                placeholder="Years"
              />
              <input
                name="workexperienceMonth"
                ref={(el) => {
                  fieldRefs.current.workexperienceMonth = el;
                }}
                value={formData.workexperienceMonth}
                onChange={handleChange}
                className={inputClass}
                placeholder="Months"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Salary Type</label>
            <RadioPills
              name="salaryType"
              options={["Account Transfer", "Cash"]}
              value={formData.salaryType}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.salaryType = el;
              }}
            />
          </div>

          <div>
            <label className={labelClass}>Salary Details (₹)</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {[
                { name: "grossPay", placeholder: "Gross Pay" },
                { name: "netPay", placeholder: "Net Pay" },
                { name: "pfDeduction", placeholder: "PF Deduction" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  ref={(el) => {
                    fieldRefs.current[field.name] = el;
                  }}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Other Income</label>
            <RadioPills
              name="otherIncome"
              options={["Co-applicant", "Rental Income", "Other Income"]}
              value={formData.otherIncome}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.otherIncome = el;
              }}
            />
          </div>
        </div>
      ) : (
        <div className={cardBorder}>
          <div className="flex items-center gap-3 pb-1">
            <div className="w-10 h-10 rounded-xl bg-[#F3EAFF] flex items-center justify-center">
              <BiBuildings size={20} className="text-[#8A38F5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Business Details</h3>
              <p className="text-xs text-gray-400">Tell us about your business income</p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Business Sector</label>
            <RadioPills
              name="businessSector"
              options={["Services", "Traders", "Manufacturing"]}
              value={formData.businessSector}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.businessSector = el;
              }}
            />
          </div>

          <div>
            <label className={labelClass}>Business Category</label>
            <RadioPills
              name="businessCategory"
              options={["Private Limited", "Proprietorship", "Partnership"]}
              value={formData.businessCategory}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.businessCategory = el;
              }}
            />
          </div>

          <div>
            <label className={labelClass}>
              Business Experience (as per Shop Act / Registration)
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <input
                name="businessExperienceYears"
                ref={(el) => {
                  fieldRefs.current.businessExperienceYears = el;
                }}
                value={formData.businessExperienceYears}
                onChange={handleChange}
                className={inputClass}
                placeholder="Years"
              />
              <input
                name="businessExperienceMonths"
                ref={(el) => {
                  fieldRefs.current.businessExperienceMonths = el;
                }}
                value={formData.businessExperienceMonths}
                onChange={handleChange}
                className={inputClass}
                placeholder="Months"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Other Income</label>
            <RadioPills
              name="businessOtherIncome"
              options={["Co-applicant", "Rental Income", "Other Income"]}
              value={formData.businessOtherIncome}
              onChange={handleChange}
              fieldRef={(el) => {
                fieldRefs.current.businessOtherIncome = el;
              }}
            />
          </div>
        </div>
      )}

      <div className={cardBorder}>
        <h3 className="font-bold text-base text-gray-900">Financial Summary</h3>
        <div>
          <label className={labelClass}>Yearly Income (as per ITR)</label>
          <MoneyInput
            name="yearIncome"
            value={formData.yearIncome}
            onChange={handleChange}
            placeholder="Enter annual income"
            fieldRef={(el) => {
              fieldRefs.current.yearIncome = el;
            }}
          />
        </div>
        <div>
          <label className={labelClass}>Monthly Avg. Balance (Bank Statement)</label>
          <MoneyInput
            name="monthIncome"
            value={formData.monthIncome}
            onChange={handleChange}
            placeholder="Enter average balance"
            fieldRef={(el) => {
              fieldRefs.current.monthIncome = el;
            }}
          />
        </div>
        <div>
          <label className={labelClass}>Ongoing Loan EMI (if any)</label>
          <MoneyInput
            name="ongoingEmi"
            value={formData.ongoingEmi}
            onChange={handleChange}
            placeholder="Enter EMI amount"
            fieldRef={(el) => {
              fieldRefs.current.ongoingEmi = el;
            }}
          />
        </div>
      </div>
    </div>
  );
}
