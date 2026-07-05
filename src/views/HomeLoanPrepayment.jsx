"use client";
import { useState } from "react";
import ExploreVerifiedProperties from "../components/seocomponents/common/ExploreVerifiedProperties";
import { openAgentAdvisor } from "../utils/openAgentAdvisor";

// ─── Inline Icons ─────────────────────────────────────────────────────────────
const CheckIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const CrossIcon = () => (
  <svg
    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#7A7487]"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const ChevronDownIcon = ({ open }) => (
  <svg
    className="w-3 h-3 flex-shrink-0 text-[#151C27] transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    className="w-4 h-4 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const ClockIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M12 6v6l4 2" />
  </svg>
);
const CoinIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M12 8v8M9 11h6" />
  </svg>
);
const CalcIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6h8M8 10h8M8 14h4M8 18h2" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}
function formatLakh(n) {
  const l = n / 100000;
  return l % 1 === 0 ? `₹${l} Lakh` : `₹${l.toFixed(1)} Lakh`;
}
function calcEMI(P, rAnnual, tenureYears) {
  const r = rAnnual / 12 / 100;
  const n = tenureYears * 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
function calcSavings(P, rAnnual, tenureYears) {
  const r = rAnnual / 12 / 100;
  const n = tenureYears * 12;
  const emi = calcEMI(P, rAnnual, tenureYears);
  const interestWithout = emi * n - P;
  const prepay = P * 0.1;
  let balance = P;
  let totalInterestWith = 0;
  let monthsPaid = 0;
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    totalInterestWith += interest;
    balance = balance - (emi - interest);
    monthsPaid++;
    if (i === 12 && balance > 0) balance = Math.max(0, balance - prepay);
    if (balance <= 0) break;
  }
  return {
    emi,
    interestSaved: Math.max(0, interestWithout - totalInterestWith),
    tenureReduced: Math.max(0, n - monthsPaid),
    interestWithout,
  };
}

// ─── Slider ───────────────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  minLabel,
  maxLabel,
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[13px] font-bold tracking-[0.8px] uppercase text-[#494455]">
          {label}
        </span>
        <span className="text-[15px] font-bold text-[#4500B4]">{display}</span>
      </div>
      <div className="relative flex items-center h-5">
        <div className="w-full h-[6px] rounded-full bg-[#E4E0EF] relative">
          <div
            className="absolute top-0 left-0 h-[6px] rounded-full bg-[#5E23DC]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-5"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-[#5E23DC] border-2 border-white shadow-md"
          style={{
            left: `calc(${pct}% - 10px)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-[#7A7487] mt-1.5">
        <span>{minLabel || min}</span>
        <span>{maxLabel || max}</span>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#CBC3D8] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center gap-4 py-5 text-left bg-transparent border-0 cursor-pointer"
      >
        <span className="font-manrope font-semibold text-[16px] sm:text-[18px] lg:text-[22px] leading-7 text-[#151C27]">
          {q}
        </span>
        <ChevronDownIcon open={isOpen} />
      </button>
      {isOpen && (
        <p className="font-jakarta text-[14px] sm:text-[15px] leading-6 text-[#494455] pb-5">
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Guide Card ───────────────────────────────────────────────────────────────
function GuideCard({ icon, title, desc, cta }) {
  return (
    <div className="bg-white border border-[rgba(203,195,216,0.3)] rounded-2xl p-8 flex flex-col gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
      <div className="w-10 h-10 rounded-xl bg-[#F0F3FF] flex items-center justify-center text-[#5E23DC]">
        {icon}
      </div>
      <div>
        <h4 className="font-manrope font-semibold text-[20px] leading-8 text-[#151C27] mb-2">
          {title}
        </h4>
        <p className="font-jakarta text-[14px] leading-6 text-[#494455]">
          {desc}
        </p>
      </div>
      <a
        href="#"
        className="flex items-center gap-2 font-jakarta font-bold text-[14px] text-[#4500B4] hover:gap-3 transition-all mt-auto group"
      >
        {cta} <ArrowRightIcon />
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomeLoanPrepayment() {
  const [loanAmount, setLoanAmount] = useState(8020000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(15);
  const [activeTab, setActiveTab] = useState("reduce-tenure");
  const [openFaq, setOpenFaq] = useState(0);

  const { emi, interestSaved, tenureReduced, interestWithout } = calcSavings(
    loanAmount,
    interestRate,
    tenure,
  );
  const tenureReducedYears = (tenureReduced / 12).toFixed(1);
  const totalInterest = emi * tenure * 12 - loanAmount;

  const faqs = [
    {
      q: "Is home loan prepayment always beneficial?",
      a: "Prepayment is beneficial in most cases, especially in the early years of a loan. However, it depends on your interest rate, alternative investment returns, and financial stability.",
    },
    {
      q: "Should I reduce EMI or reduce tenure after prepayment?",
      a: "Reducing tenure saves significantly more interest over the loan's lifetime. Reducing EMI improves monthly cash flow. Choose based on your financial goals.",
    },
    {
      q: "Are there any charges for home loan prepayment?",
      a: "For floating-rate home loans from banks, RBI has mandated no prepayment penalty. However, fixed-rate loans or loans from NBFCs may carry charges. Always check your loan agreement.",
    },
    {
      q: "What is the best time to prepay a home loan?",
      a: "The earlier you prepay, the more interest you save. Prepaying within the first 5–7 years is most impactful due to how amortisation front-loads interest.",
    },
  ];

  const prepayRows = [
    {
      amount: "₹1,00,000",
      interest: `₹${formatINR(Math.round(interestSaved * 0.1))}`,
      tenure: "7 months reduced",
    },
    {
      amount: "₹5,00,000",
      interest: `₹${formatINR(Math.round(interestSaved * 0.5))}`,
      tenure: "3–4 years reduced",
    },
    {
      amount: "₹10,00,000",
      interest: `₹${formatINR(Math.round(interestSaved))}`,
      tenure: `${tenureReducedYears} years reduced`,
    },
  ];

  return (
    <div className="bg-[#F9F9FF] font-sans min-w-0">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 sm:px-6 lg:px-16 pt-8 pb-10 lg:pb-16">
        <div className="max-w-[1312px] mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left: text */}
          <div className="flex-1 min-w-0">
            <h1 className="font-['Segoe_UI',sans-serif] font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.96px] text-[#151C27] mb-4">
              Home Loan Prepayment Calculator:{" "}
              <span className="text-[#5E23DC]">
                Save Interest &amp; Reduce Loan Tenure
              </span>
            </h1>
            <p className="font-jakarta text-[15px] sm:text-[17px] lg:text-[18px] leading-7 text-[#494455] mb-6 max-w-xl">
              Got a bonus or extra funds? This calculator helps you clearly
              understand whether prepaying your home loan will help you reduce
              your monthly EMI or shorten your loan tenure and save lakhs in
              interest over time.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button className="bg-[#5E23DC] hover:bg-[#4500B4] text-white font-['Segoe_UI',sans-serif] font-bold text-[15px] px-6 sm:px-8 py-3.5 rounded-lg transition-colors shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] w-full sm:w-auto">
                Calculate Prepayment Savings
              </button>
              <button className="border-2 border-[#5E23DC] text-[#5E23DC] hover:bg-[#F0F3FF] font-['Segoe_UI',sans-serif] font-bold text-[15px] px-6 sm:px-8 py-3.5 rounded-lg transition-colors w-full sm:w-auto">
                Reduce EMI or Tenure?
              </button>
            </div>
            <div className="flex flex-wrap gap-5">
              {["Bank-neutral", "No sales bias", "Instant results"].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 font-jakarta font-bold text-[15px] text-[#494455]"
                >
                  <span className="w-3 h-3 rounded-full border-2 border-[#494455] flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Guide card */}
          <div className="w-full sm:max-w-xs lg:w-[532px] lg:max-w-[532px] flex-shrink-0 flex items-center justify-center">
            <div className="w-full flex md:mt-15 items-center justify-center rounded-2xl overflow-hidden md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <div className="text-white relative overflow-hidden w-full flex items-center justify-center">
                <img src="/assets/seoPages/HomeLoanPrePayment/hero.svg" alt="hero image" className="w-full bg-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-6">
        <div className="max-w-[1312px] mx-auto">
          <div className="bg-[#F0F3FF] border border-[rgba(203,195,216,0.3)] rounded-3xl p-4 sm:p-8 lg:p-12 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Sliders panel */}
              <div className="flex-1 min-w-0">
                <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[26px] lg:text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] mb-1">
                  Loan Details
                </h2>
                <div className="w-20 h-1.5 bg-[#4500B4] rounded-full mb-8" />

                <Slider
                  label="Loan Amount (₹)"
                  value={loanAmount}
                  min={500000}
                  max={10000000}
                  step={100000}
                  onChange={setLoanAmount}
                  display={formatLakh(loanAmount)}
                  minLabel="5L"
                  maxLabel="1Cr"
                />
                <Slider
                  label="Interest Rate (%)"
                  value={interestRate}
                  min={6}
                  max={15}
                  step={0.1}
                  onChange={setInterestRate}
                  display={`${interestRate}%`}
                  minLabel="6%"
                  maxLabel="15%"
                />
                <Slider
                  label="Outstanding Tenure (Years)"
                  value={tenure}
                  min={1}
                  max={30}
                  step={1}
                  onChange={setTenure}
                  display={`${tenure} Years`}
                  minLabel="1 yr"
                  maxLabel="30 yr"
                />
              </div>

              {/* Summary panel */}
              <div className="w-full lg:w-[476px] flex-shrink-0">
                <div className="bg-white border border-[rgba(69,0,180,0.1)] rounded-2xl p-6 sm:p-8 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] flex flex-col gap-6 h-full">
                  {/* Summary header */}
                  <div className="pb-6 border-b border-[#CBC3D8]">
                    <p className="font-jakarta text-[13px] uppercase tracking-wider text-[#7A7487] mb-4">
                      Summary Panel
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-jakarta text-[13px] text-[#494455] mb-1">
                          Original EMI
                        </p>
                        <p className="font-manrope text-[15px] font-semibold text-[#151C27]">
                          ₹{formatINR(Math.round(emi))}
                        </p>
                      </div>
                      <div>
                        <p className="font-jakarta text-[13px] text-[#494455] mb-1">
                          Total Interest
                        </p>
                        <p className="font-manrope text-[15px] font-semibold text-[#151C27]">
                          ₹{(totalInterest / 10000000).toFixed(2)} Cr
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Savings highlights */}
                  <div className="bg-[rgba(94,35,220,0.05)] rounded-2xl p-5 flex flex-col gap-5">
                    {/* Projected Savings */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#5E23DC] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                        <CoinIcon />
                      </div>
                      <div>
                        <p className="font-['Segoe_UI',sans-serif] font-bold text-[14px] text-[#4500B4] mb-0.5">
                          Projected Savings
                        </p>
                        <p className="font-['Segoe_UI',sans-serif] font-bold text-[28px] sm:text-[32px] leading-10 tracking-[-0.32px] text-[#20005E]">
                          ₹{formatINR(Math.round(interestSaved))}
                        </p>
                      </div>
                    </div>
                    {/* Tenure Reduced */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#575161] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                        <ClockIcon />
                      </div>
                      <div>
                        <p className="font-['Segoe_UI',sans-serif] font-bold text-[14px] text-[#3F3A49] mb-0.5">
                          Tenure Reduced
                        </p>
                        <p className="font-['Segoe_UI',sans-serif] font-bold text-[28px] sm:text-[32px] leading-10 tracking-[-0.32px] text-[#151C27]">
                          {tenureReducedYears} Years
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-[#5E23DC] hover:bg-[#4500B4] text-white font-['Segoe_UI',sans-serif] font-bold text-[16px] py-4 rounded-2xl transition-colors">
                    Apply For Loan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REDUCE EMI VS TENURE ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-10 lg:pt-20">
        <div className="max-w-[1312px] mx-auto">
          <div className="md:text-center mb-10">
            <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.96px] text-[#151C27]">
              Reduce EMI vs Reduce Tenure: Which Saves More?
            </h2>
            <p className="font-jakarta text-[16px] sm:text-[18px] text-[#494455] mt-3">
              Compare the long-term impact of your prepayment strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 relative">
            {/* Reduce EMI Card */}
            <div
              onClick={() => setActiveTab("reduce-emi")}
              className={`cursor-pointer rounded-3xl border p-8 sm:p-10 transition-all ${
                activeTab === "reduce-emi"
                  ? "border-2 border-[#4500B4] bg-white shadow-md"
                  : "border border-[rgba(203,195,216,0.3)] bg-white hover:border-[#CBC3D8]"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-4.5 text-[#4500B4]">
                  <svg viewBox="0 0 20 18" fill="currentColor">
                    <path d="M10 0L0 18h20L10 0z" />
                  </svg>
                </div>
                <h3 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] lg:text-[24px] text-[#151C27]">
                  Reduce EMI
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  { text: "Monthly EMI reduces", good: true },
                  { text: "Improves short-term cash flow", good: true },
                  { text: "Lower total monthly outgo", bad: false },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-jakarta text-[15px] text-[#494455]"
                  >
                    {item.bad ? (
                      <svg
                        className="w-3 h-3 mt-1 flex-shrink-0 text-[#BA1A1A]"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                      >
                        <circle cx="6" cy="6" r="6" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-3 mt-1 flex-shrink-0 text-[#4500B4]"
                        fill="currentColor"
                        viewBox="0 0 14 10"
                      >
                        <path
                          d="M1 5l4 4 8-8"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reduce Tenure Card — RECOMMENDED */}
            <div
              onClick={() => setActiveTab("reduce-tenure")}
              className={`cursor-pointer rounded-3xl border-2 p-8 sm:p-10 transition-all relative ${
                activeTab === "reduce-tenure"
                  ? "border-[#4500B4] bg-white shadow-md"
                  : "border-[rgba(203,195,216,0.3)] bg-white hover:border-[#4500B4]"
              }`}
            >
              <span className="absolute top-4 right-4 bg-[#4500B4] text-white font-jakarta font-bold text-[10px] tracking-[1px] uppercase px-3 py-1 rounded-full">
                Recommended
              </span>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-4 text-[#4500B4]">
                  <svg viewBox="0 0 20 16" fill="currentColor">
                    <rect x="0" y="0" width="20" height="4" rx="2" />
                    <rect x="0" y="6" width="20" height="4" rx="2" />
                    <rect x="0" y="12" width="12" height="4" rx="2" />
                  </svg>
                </div>
                <h3 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] lg:text-[24px] text-[#151C27]">
                  Reduce Tenure
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "EMI stays the same",
                  "Maximum interest saved",
                  "Become debt-free sooner",
                  "Loan closes years earlier",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-jakarta text-[15px] text-[#494455]"
                  >
                    <svg
                      className="w-4 h-3 mt-1 flex-shrink-0 text-[#4500B4]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 14 10"
                      strokeLinecap="round"
                    >
                      <path d="M1 5l4 4 8-8" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center font-jakarta font-bold italic text-[16px] sm:text-[18px] text-[#4500B4]">
            With the same prepayment amount, reducing tenure can save 2–3× more
            interest than reducing EMI.
          </p>
        </div>
      </section>

      {/* ── PREPAY TODAY TABLE ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-6 lg:pt-16">
        <div className="max-w-[1312px] mx-auto">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[24px] sm:text-[28px] lg:text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] mb-6">
            What Happens If You Prepay Today?
          </h2>
          <div className="border border-[#CBC3D8] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">
                <thead>
                  <tr className="bg-[#5E23DC]">
                    <th className="text-left font-['Segoe_UI',sans-serif] font-bold text-[18px] sm:text-[22px] lg:text-[24px] text-white px-5 sm:px-6 py-5">
                      Prepayment Amount
                    </th>
                    <th className="text-left font-['Segoe_UI',sans-serif] font-bold text-[18px] sm:text-[22px] lg:text-[24px] text-white px-5 sm:px-6 py-5">
                      Interest Saved
                    </th>
                    <th className="text-left font-['Segoe_UI',sans-serif] font-bold text-[18px] sm:text-[22px] lg:text-[24px] text-white px-5 sm:px-6 py-5 hidden sm:table-cell">
                      Tenure Reduced
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prepayRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-t border-[#CBC3D8] ${i % 2 === 1 ? "bg-[#F0F3FF]" : "bg-white"}`}
                    >
                      <td className="px-5 sm:px-6 py-5 font-jakarta font-bold text-[16px] sm:text-[18px] text-[#151C27]">
                        {row.amount}
                      </td>
                      <td className="px-5 sm:px-6 py-5 font-jakarta font-bold text-[16px] sm:text-[18px] text-[#4500B4]">
                        {row.interest} saved
                      </td>
                      <td className="px-5 sm:px-6 py-5 font-jakarta text-[16px] sm:text-[18px] text-[#494455] hidden sm:table-cell">
                        {row.tenure}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-3 font-jakarta italic text-[14px] text-[#494455]">
            ₹10 lakh today can save you ₹{formatINR(Math.round(interestSaved))}{" "}
            in interest over time. These examples highlight the power of early
            prepayment.
          </p>
        </div>
      </section>

      {/* ── PREPAY OR INVEST ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-8 lg:pt-20">
        <div className="max-w-[1312px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            {/* Left: decision cards */}
            <div className="flex-1 min-w-0">
              <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] sm:text-[28px] lg:text-[32px] leading-tight tracking-[-0.32px] text-[#151C27] mb-8">
                Should You Prepay Your Home Loan or Invest the Money?
              </h2>

              {/* Prepay If */}
              <div className="bg-white border-l-8 border-[#4500B4] rounded-2xl p-6 sm:p-8 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-16 h-16 rounded-full border-4 border-[#4500B4] flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-[#4500B4]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] lg:text-[24px] text-[#4500B4]">
                    Prepay If
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Loan interest rate is higher than expected investment returns — prepayment gives a guaranteed return",
                    "You have a sufficient emergency fund",
                    "Your income is stable",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-jakarta text-[15px] text-[#151C27]"
                    >
                      <svg
                        className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#4500B4]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Avoid Prepaying If */}
              <div className="bg-[#F0F3FF] rounded-2xl p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <h3 className="font-['Segoe_UI',sans-serif] font-bold text-[22px] lg:text-[24px] text-[#151C27] mb-5">
                  Avoid Prepaying If
                </h3>
                <ul className="space-y-4">
                  {[
                    "You'll get better investment returns elsewhere (e.g. equity at 12%+ CAGR)",
                    "Your monthly cash flow is tight or unstable",
                    "There is job or income uncertainty",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-jakarta text-[15px] text-[#494455]"
                    >
                      <CrossIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: image */}
            <div className="w-full lg:w-[624px] flex-shrink-0 rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] h-72 sm:h-96 lg:h-[632px] bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 flex items-center justify-center">
              <img src="/assets/seoPages/HomeLoanPrePayment/image.svg" alt="image" />
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST TIME TO PREPAY ───────────────────────────────────────────── */}
      <section className="mx-4 sm:mx-6 lg:mx-16 my-8 lg:my-16 bg-[#E8DFF2] rounded-[48px] px-6 sm:px-12 lg:px-48 py-14 lg:py-16">
        <div className="max-w-3xl">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.96px] text-[#1E1927] mb-8">
            Best Time to Prepay Your Home Loan
          </h2>
          <p className="font-jakarta text-[16px] sm:text-[18px] leading-[29px] text-[#4A4454] mb-5">
            In the initial years of a home loan, a large portion of your EMI
            goes towards paying interest rather than the principal amount. This
            is due to the way amortization works.
          </p>
          <p className="font-jakarta text-[16px] sm:text-[18px] leading-[29px] text-[#4A4454]">
            As a result, making prepayments during the early phase of your loan
            — typically within the first 5 to 7 years — can dramatically reduce
            the total interest payable. Late-stage prepayments, while still
            helpful, usually offer limited benefits compared to early action.
          </p>
        </div>
      </section>

      {/* ── EXPLORE HOME LOAN GUIDES ──────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-6 lg:pt-16">
        <div className="max-w-[1312px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
            <div>
              <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[24px] sm:text-[28px] lg:text-[32px] tracking-[-0.32px] text-[#151C27]">
                Explore More Home Loan Guides
              </h2>
              <p className="font-jakarta text-[14px] text-[#494455] mt-1">
                Master your mortgage with expert resources
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 font-jakarta font-bold text-[15px] text-[#4500B4] hover:gap-3 transition-all flex-shrink-0 group"
            >
              View All Guides <ArrowRightIcon />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <GuideCard
              icon={<CalcIcon />}
              title="Home Loan EMI Calculator"
              desc="Calculate your monthly EMI based on loan amount, interest rate, and tenure."
              cta="Calculate EMI"
            />
            <GuideCard
              icon={<ClockIcon />}
              title="Reduce EMI or Reduce Tenure?"
              desc="Understand which option works better for your financial goals and cash flow."
              cta="Compare Options"
            />
            <GuideCard
              icon={<CoinIcon />}
              title="Best Time to Prepay Home Loan"
              desc="Learn when prepayment delivers maximum interest savings during your loan tenure."
              cta="Read Guide"
            />
          </div>
        </div>
      </section>

      <ExploreVerifiedProperties loanAmount={loanAmount} />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-16 py-12 lg:py-20">
        <div className="max-w-[1312px] mx-auto">
          <h2 className="font-['Segoe_UI',sans-serif] font-bold text-[24px] sm:text-[28px] lg:text-[32px] tracking-[-0.32px] text-[#151C27] mb-10 md:text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="mx-4 sm:mx-6 lg:mx-16 mb-8 lg:mb-16 bg-gradient-to-r from-[#5E23DC] to-[#4500B4] rounded-[48px] px-6 sm:px-16 lg:px-20 py-16 lg:py-[120px] text-center relative overflow-hidden isolation-isolate">
        {/* Decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-[600px] h-[600px] rounded-full border-[4px] border-white" />
        </div>

        <div className="relative z-10">
          <h2 className="font-manrope font-bold text-[26px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-[56px] tracking-[-0.96px] text-white mb-4">
            Still confused whether to prepay or invest?
          </h2>
          <p className="font-jakarta text-[15px] sm:text-[18px] text-[rgba(232,221,255,0.8)] mb-10 max-w-lg mx-auto">
            Get a bank-neutral opinion before making a big financial decision
          </p>
          <button
            type="button"
            onClick={() =>
              openAgentAdvisor(
                "I'm confused whether to prepay my home loan or invest. Can you guide me?",
              )
            }
            className="bg-white text-[#4500B4] font-manrope font-semibold text-[15px] px-8 py-4 rounded-2xl hover:bg-[#F0F3FF] transition-colors shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
          >
            Talk to a Reparv Advisor
          </button>
        </div>
      </section>
    </div>
  );
}
