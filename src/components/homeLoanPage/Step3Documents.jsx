import { FiUpload } from "react-icons/fi";

export default function Step3Documents({ formData, setFormData, fieldRefs }) {
  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass =
    "w-full border border-[#D9D9D9] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5]";
  const cardBorder =
    "bg-white p-4 sm:p-6 border border-[#B8B8B8] rounded-xl space-y-6";
  const uploadBox =
    "w-full border-2 border-dashed border-[#D9D9D9] rounded-xl py-8 px-4 flex flex-col items-center gap-3 text-center bg-[#FAF8FF]";
  const uploadBtn =
    "mt-2 px-5 py-2 rounded-lg text-sm font-semibold bg-[#8A38F5] text-white hover:bg-[#732EE6] active:scale-95 transition";

  /* ================= PAN ================= */
  const handlePanImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      panImage: file,
    }));
  };

  /* ================= AADHAAR ================= */
  const handleAadhaarFront = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      aadhaarFrontImage: file,
    }));
  };

  const handleAadhaarBack = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      aadhaarBackImage: file,
    }));
  };

  return (
    <div className={cardBorder}>
      <h3 className="font-bold text-xl">Upload Documents</h3>

      {/* ================= PAN CARD ================= */}
      <div className="space-y-3">
        <label className={labelClass}>
          Pancard <span className="text-red-500">*</span>
        </label>

        <input
          name="panNumber"
          ref={(el) => (fieldRefs.current.panNumber = el)}
          value={formData.panNumber}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            if (!/^[A-Z0-9]*$/.test(value) || value.length > 10) return;

            setFormData((prev) => ({
              ...prev,
              panNumber: value,
            }));
          }}
          className={`${inputClass} mt-1 uppercase`}
          placeholder="ABCDE1234F"
        />

        {formData.panNumber &&
          !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber) && (
            <p className="text-xs text-red-500 mt-1">
              Enter valid PAN (ABCDE1234F)
            </p>
          )}

        <div className={uploadBox}>
          {formData.panImage ? (
            <img
              src={URL.createObjectURL(formData.panImage)}
              alt="PAN Preview"
              className="w-40 h-24 object-cover rounded-md"
            />
          ) : (
            <>
              <FiUpload size={26} className="text-gray-400" />
              <p className="text-sm text-gray-600 font-medium">Upload PAN Image</p>
            </>
          )}

          <input
            type="file"
            ref={(el) => (fieldRefs.current.panImage = el)}
            accept="image/*"
            id="panUpload"
            onChange={handlePanImage}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => document.getElementById("panUpload").click()}
            className={uploadBtn}
          >
            {formData.panImage ? "Change Image" : "Upload PAN Image"}
          </button>
        </div>
      </div>

      {/* ================= AADHAAR CARD ================= */}
      <div className="space-y-3">
        <label className={labelClass}>
          Aadhaar Card <span className="text-red-500">*</span>
        </label>

        <input
          className={inputClass}
          ref={(el) => (fieldRefs.current.aadhaarNumber = el)}
          value={formData.aadhaarNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length <= 12) {
              setFormData({ ...formData, aadhaarNumber: value });
            }
          }}
          placeholder="Enter Aadhaar Number"
        />

        {formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber) && (
          <p className="text-xs text-red-500 mt-1">
            Aadhaar number must be exactly 12 digits
          </p>
        )}

        {/* Aadhaar Front */}
        <div className={uploadBox}>
          {formData.aadhaarFrontImage ? (
            <img
              src={URL.createObjectURL(formData.aadhaarFrontImage)}
              alt="Aadhaar Front"
              className="w-40 h-24 object-cover rounded-md"
            />
          ) : (
            <>
              <FiUpload size={26} className="text-gray-400" />
              <p className="text-sm font-medium text-gray-600">
                Upload Aadhaar Front
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            id="aadhaarFront"
            onChange={handleAadhaarFront}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => document.getElementById("aadhaarFront").click()}
            className={uploadBtn}
          >
            {formData.aadhaarFrontImage ? "Change Front Image" : "Upload Front Image"}
          </button>
        </div>

        {/* Aadhaar Back */}
        <div className={uploadBox}>
          {formData.aadhaarBackImage ? (
            <img
              src={URL.createObjectURL(formData.aadhaarBackImage)}
              alt="Aadhaar Back"
              className="w-40 h-24 object-cover rounded-md"
            />
          ) : (
            <>
              <FiUpload size={26} className="text-gray-400" />
              <p className="text-sm font-medium text-gray-600">
                Upload Aadhaar Back
              </p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            id="aadhaarBack"
            onChange={handleAadhaarBack}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => document.getElementById("aadhaarBack").click()}
            className={uploadBtn}
          >
            {formData.aadhaarBackImage ? "Change Back Image" : "Upload Back Image"}
          </button>
        </div>
      </div>
    </div>
  );
}
