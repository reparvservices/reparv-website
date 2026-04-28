import InfoIcon from "../../../assets/seopageassets/verify712/info-icon.svg";

export default function VerifyLandRecord() {
  return (
    <section className="bg-white py-6 sm:py-12">
      <div className="max-w-[900px] mx-auto px-4">
        {/* ================= DESKTOP HEADER ================= */}
        <div className="hidden sm:block text-center mb-8">
          <h2 className="text-5xl font-bold text-[#3F2D62]">
            Verify Your Land Record
          </h2>
          <p className="text-gray-500 mt-2">
            Enter the details below to fetch your 7/12 Utara instantly
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_#8A38F529] p-5 sm:p-8">
          {/* ================= MOBILE HEADER ================= */}
          <div className="block sm:hidden mb-6">
            <h2 className="text-lg font-bold text-[#3F2D62]">
              Verify Your Land Record
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter the details below to fetch your 7/12 Utara instantly
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Select label="District" required />
            <Select label="Taluka" required />
            <Select label="Village" required />
            <Input label="Survey Number / Gat Number" required />
            <Input label="Sub Division (Optional)" />
          </div>

          {/* ================= WARNING ================= */}
          <div className="mt-6">
            <WarningBanner
              icon={InfoIcon}
              text="Ensure all details are accurate. Incorrect information may result in failed verification."
            />
          </div>

          {/* ================= BUTTON ================= */}
          <div className="flex justify-center mt-6">
            <button className="w-full sm:max-w-md h-[52px] bg-[#7C3AED] text-white text-lg font-semibold rounded-xl shadow-[0_8px_20px_#8A38F529] hover:opacity-95 transition">
              Verify Land Record
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= INPUTS ================= */

function Input({ label, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        placeholder="e.g. 1234"
        className="w-full h-[48px] rounded-lg border border-[#E5E5E5] px-4 text-sm focus:outline-none focus:border-[#7C3AED]"
      />
    </div>
  );
}

function Select({ label, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select className="w-full h-[48px] rounded-lg border border-[#E5E5E5] px-4 text-sm bg-white focus:outline-none focus:border-[#7C3AED]">
        <option value="">Select {label}</option>
      </select>
    </div>
  );
}

/* ================= WARNING ================= */

function WarningBanner({ icon, text }) {
  return (
    <div className="flex gap-3 items-start bg-[#FFF6E0] border-l-4 border-[#FFC107] rounded-md px-4 py-3">
      <img src={icon} alt="info" className="w-4 h-4 mt-0.5" />
      <p className="text-sm text-gray-700 leading-relaxed">
        <span className="font-semibold text-gray-800">Important:</span> {text}
      </p>
    </div>
  );
}
