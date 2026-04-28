export default function GetInTouch() {
  return (
    <section className="bg-[#F6F1FF] py-10 sm:py-16">
      <div className="max-w-[1100px] mx-auto px-4">
        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(138,56,245,0.12)] p-6 sm:p-10 max-w-[820px] mx-auto">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Share your requirements and we&apos;ll connect you with the right
              builders
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6">
            {/* ROW 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Full Name"
                required
                placeholder="Enter your Full Name"
              />
              <FormInput
                label="Mobile Number"
                required
                placeholder="+91 xxxx xxxx"
              />
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormSelect
                label="Preferred City"
                required
                options={["Mumbai", "Delhi", "Bangalore", "Pune"]}
              />
              <FormSelect
                label="Looking For"
                required
                options={["Apartment", "Villa", "Plot", "Commercial"]}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Tell us about Your Requirement"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#7C3AED] resize-none"
              />
            </div>

            {/* BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-[50px] bg-[#7C3AED] text-white font-semibold rounded-xl shadow-[0_10px_25px_rgba(124,58,237,0.35)] hover:opacity-95 transition"
              >
                Submit Enquiry
              </button>
            </div>

            {/* FOOTER NOTE */}
            <p className="text-xs text-center text-gray-400 mt-3">
              By submitting, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ===============================
   REUSABLE INPUT COMPONENTS
=============================== */

function FormInput({ label, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[46px] rounded-lg border border-gray-300 px-4 text-sm focus:outline-none focus:border-[#7C3AED]"
      />
    </div>
  );
}

function FormSelect({ label, options, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select className="w-full h-[46px] rounded-lg border border-gray-300 px-4 text-sm bg-white focus:outline-none focus:border-[#7C3AED]">
        <option value="">Select Option</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
