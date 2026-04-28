import { useState, useEffect, useMemo } from "react";
import PropertyCanAfford from "./PropertyCanAfford";

export default function HomeTotalCostCalculator() {
  /* ---------- FORM STATE ---------- */
  const [agreementValue, setAgreementValue] = useState(5250000);
  const [buyerCategory, setBuyerCategory] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");

  const [stampDutyPct, setStampDutyPct] = useState(5);
  const [registrationPct, setRegistrationPct] = useState(1);
  const [registrationCap, setRegistrationCap] = useState(100000);
  const [legalCharges, setLegalCharges] = useState(100000);

  /* ---------- RESULT STATE ---------- */
  const [calculatedData, setCalculatedData] = useState({
  agreement: "",
  stampDuty: "",
  registrationFee: "",
  gst: "",
  legalCharges: "",
  totalCost: "",
});


  /* ---------- AUTO ADJUST STAMP DUTY ---------- */
  useEffect(() => {
    if (buyerCategory === "female") setStampDutyPct(4);
    else if (buyerCategory === "male") setStampDutyPct(5);
  }, [buyerCategory]);

  /* ---------- CORE COST LOGIC ---------- */
  const calculateCost = () => {
    const agreement = Number(agreementValue) || 0;
    const stampPct = Number(stampDutyPct) || 0;
    const regPct = Number(registrationPct) || 0;
    const regCap = Number(registrationCap) || 0;
    const legal = Number(legalCharges) || 0;

    const stampDuty = (agreement * stampPct) / 100;

    const registrationFee = Math.min((agreement * regPct) / 100, regCap);

    const gst = propertyStatus === "under_construction" ? agreement * 0.05 : 0;

    const totalCost = agreement + stampDuty + registrationFee + gst + legal;

    setCalculatedData({
      agreement,
      stampDuty,
      registrationFee,
      gst,
      legalCharges: legal,
      totalCost,
    });
  };

  /* ---------- DATA FOR PROPERTY CAN AFFORD ---------- */
  const budgetData = useMemo(() => {
    if (!calculatedData) return null;

    const extraCharges =
      calculatedData.stampDuty +
      calculatedData.registrationFee +
      calculatedData.gst +
      calculatedData.legalCharges;

    return {
      totalCost: calculatedData.totalCost,
      extraCharges,
      agreementValue: calculatedData.agreement,
    };
  }, [calculatedData]);

  return (
    <section className="bg-dark py-10 sm:py-16">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-4xl font-bold text-[#3D2A5D]">
          Calculate Your Home Total Cost
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Adjust the fields below to calculate your total home cost
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 mt-10">
          {/* LEFT */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0px_0px_87px_-3px_#8A38F529]">
            <h3 className="text-xl font-bold mb-6">Property Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Agreement Value (₹)"
                value={agreementValue}
                onChange={setAgreementValue}
              />

              <Select
                label="Buyer Category"
                value={buyerCategory}
                onChange={setBuyerCategory}
                options={[
                  { label: "Select", value: "" },
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />

              <Select
                label="Property Status"
                value={propertyStatus}
                onChange={setPropertyStatus}
                options={[
                  { label: "Select", value: "" },
                  { label: "Ready to Move", value: "ready" },
                  { label: "Under Construction", value: "under_construction" },
                ]}
              />
            </div>

            <h3 className="text-xl font-bold mt-8 mb-6">
              Government & Statutory Charges
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Stamp Duty (%)"
                value={stampDutyPct}
                onChange={setStampDutyPct}
              />
              <Input
                label="Registration Fee (%)"
                value={registrationPct}
                onChange={setRegistrationPct}
              />
              <Input
                label="Registration Fee Cap (₹)"
                value={registrationCap}
                onChange={setRegistrationCap}
              />
              <Input
                label="Legal Charges (₹)"
                value={legalCharges}
                onChange={setLegalCharges}
              />
            </div>

            <button
              onClick={calculateCost}
              className="w-full mt-6 bg-[#7C3AED] text-white py-3 rounded-xl font-semibold"
            >
              Calculate Cost
            </button>
          </div>

          {/* RIGHT */}
          <div
            className="rounded-2xl p-6 sm:p-8 text-white"
            style={{
              background:
                "linear-gradient(106.99deg, #5E23DC 1.17%, #8A38F5 98.83%)",
            }}
          >
            <h3 className="text-xl font-bold mb-6">Cost Summary</h3>

            {calculatedData && (
              <>
                <SummaryItem
                  label="Agreement Value"
                  value={calculatedData.agreement}
                />
                <SummaryItem
                  label="Stamp Duty"
                  value={calculatedData.stampDuty}
                />
                <SummaryItem
                  label="Registration Fee"
                  value={calculatedData.registrationFee}
                />
                <SummaryItem label="GST" value={calculatedData.gst} />
                <SummaryItem
                  label="Legal Charges"
                  value={calculatedData.legalCharges}
                />

                <div className="bg-white text-black rounded-xl mt-6 p-5 text-center">
                  <p className="font-semibold text-sm">Total Estimated Cost</p>
                  <p className="text-2xl font-bold mt-2">
                    ₹
                    {Math.round(calculatedData.totalCost).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {budgetData && (
          <PropertyCanAfford data={budgetData} loanAmount={agreementValue} />
        )}
      </div>
    </section>
  );
}

/* ---------- HELPERS ---------- */

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#D9D9D9] rounded-lg px-3 py-2 outline-none focus:border-[#7C3AED]"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#D9D9D9] rounded-lg px-3 py-2 bg-white outline-none focus:border-[#7C3AED]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white/20 rounded-xl p-4 mb-3">
      <span className="text-sm">{label}</span>
      <span className="font-bold">
        ₹{Math.round(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}
