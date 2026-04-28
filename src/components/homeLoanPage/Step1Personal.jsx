import { FaUser, FaCalendarAlt } from "react-icons/fa";

export default function Step1Personal({
  formData,
  setFormData,
  states,
  cities,
  fieldRefs
}) {
  const labelClass = "text-sm text-black";

  const inputClass =
    "w-full border border-[#D9D9D9] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5]";

  const iconClass = "absolute right-3 top-1/2 -translate-y-1/2 text-[#868686]";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-2 sm:space-y-4 bg-white p-4 sm:p-6 border border-[#B8B8B8] rounded-xl">
      <h3 className="font-bold text-xl">Personal Information</h3>

      {/* Full Name */}
      <div>
        <label className={labelClass}>
          Full Name (As per pan card) <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <input
            name="fullname"
            ref={(el) => (fieldRefs.current.fullname = el)}
            value={formData.fullname}
            onChange={handleChange}
            className={`${inputClass} pr-10`}
            placeholder="Enter your full name"
          />
          <FaUser className={iconClass} />
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className={labelClass}>
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <input
            name="dateOfBirth"
            ref={(el) => (fieldRefs.current.dateOfBirth = el)}
            value={formData.dateOfBirth}
            onChange={handleChange}
            type="text"
            placeholder="dd/mm/yyyy"
            className={`${inputClass} pr-10`}
          />
          <FaCalendarAlt className={iconClass} />
        </div>
      </div>

      {/* Mobile Number */}
      <div>
        <label className={labelClass}>
          Mobile Number <span className="text-red-500">*</span>
        </label>

        <div className="flex mt-1 border border-[#D9D9D9] rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#8A38F5]">
          <span className="px-3 flex items-center text-sm bg-gray-50 border-r border-r-[#D9D9D9]">
            +91
          </span>
          <input
            name="contactNo"
            ref={(el) => (fieldRefs.current.contactNo = el)}
            value={formData.contactNo}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactNo: e.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            className="flex-1 px-3 py-2 outline-none text-sm"
            placeholder="Enter 10-digit mobile number"
          />
        </div>

        <p className="text-xs text-gray-500 mt-1">
          we’ll send an OTP to verify this Number
        </p>
      </div>

      <div>
        <label className={labelClass}>
          Email Address <span className="text-red-500">*</span>
        </label>

        <input
          type="email"
          name="email"
          ref={(el) => (fieldRefs.current.email = el)}
          value={formData.email}
          onChange={handleChange}
          className={`${inputClass} mt-1`}
          placeholder="Enter your email address"
        />

        {/* validation message */}
        {formData.email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
            <p className="text-xs text-red-500 mt-1">
              Enter a valid email address
            </p>
          )}
      </div>

      {/* PAN */}
      <div>
        <label className={labelClass}>
          PAN Number <span className="text-red-500">*</span>
        </label>

        <input
          name="panNumber"
          ref={(el) => (fieldRefs.current.panNumber = el)}
          value={formData.panNumber}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();

            // allow only A-Z and 0-9, max 10 chars
            if (!/^[A-Z0-9]*$/.test(value) || value.length > 10) return;

            setFormData((prev) => ({
              ...prev,
              panNumber: value,
            }));
          }}
          className={`${inputClass} mt-1 uppercase`}
          placeholder="ABCDE1234F"
        />

        {/* validation message */}
        {formData.panNumber &&
          !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber) && (
            <p className="text-xs text-red-500 mt-1">
              Enter valid PAN (ABCDE1234F)
            </p>
          )}
      </div>

      {/* State + City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* STATE */}
        <div>
          <label className={labelClass}>
            State <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            ref={(el) => (fieldRefs.current.state = el)}
            value={formData.state}
            onChange={(e) => {
              handleChange(e);
              // reset city when state changes
              setFormData((prev) => ({ ...prev, city: "" }));
            }}
            className={`${inputClass} mt-1 appearance-none`}
          >
            <option value="">Select Your State</option>
            {states?.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* CITY */}
        <div>
          <label className={labelClass}>
            City <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            ref={(el) => (fieldRefs.current.city = el)}
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            className={`${inputClass} mt-1 appearance-none ${
              !formData.state ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">
              {formData.state ? "Select Your City" : "Select State First"}
            </option>
            {cities?.map((city) => (
              <option key={city.city} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pincode */}
      <div>
        <label className={labelClass}>
          Pincode <span className="text-red-500">*</span>
        </label>
        <input
          name="pincode"
          ref={(el) => (fieldRefs.current.pincode = el)}
          value={formData.pincode}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
            }))
          }
          className={`${inputClass} mt-1`}
          placeholder="Enter 6-digit pincode"
        />
      </div>
    </div>
  );
}
