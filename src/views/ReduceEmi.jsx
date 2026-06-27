"use client";
import { useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatINR(n) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}
function calcEMI(P, rAnnual, n) {
  const r = rAnnual / 12 / 100;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
function calcTenureReduction(P, rAnnual, tenureMonths, prepay) {
  const r = rAnnual / 12 / 100;
  const emi = calcEMI(P, rAnnual, tenureMonths);
  let balance = P - prepay;
  let months = 0;
  while (balance > 0.01 && months < tenureMonths) {
    const interest = balance * r;
    balance = balance - (emi - interest);
    months++;
  }
  return { tenureSavedMonths: Math.max(0, tenureMonths - months) };
}
function calcInterestSaved(P, rAnnual, tenureMonths, prepay) {
  const r = rAnnual / 12 / 100;
  const emi = calcEMI(P, rAnnual, tenureMonths);
  const totalOrig = emi * tenureMonths - P;
  let balance = P - prepay;
  let totalNew = 0;
  for (let i = 0; i < tenureMonths && balance > 0.01; i++) {
    const interest = balance * r;
    totalNew += interest;
    balance -= emi - interest;
  }
  return Math.max(0, totalOrig - totalNew);
}

// ── Icons ────────────────────────────────────────────────────────────────────
const CheckGreen = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="8.5" fill="#4CAF50" />
    <path
      d="M4.5 8.5l2.8 2.8 5-5"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CrossRed = () => (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 17 17" fill="none">
    <circle cx="8.5" cy="8.5" r="8.5" fill="#BA1A1A" />
    <path
      d="M5.5 5.5l6 6M11.5 5.5l-6 6"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg
    className={`w-3 h-2 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 12 7"
    fill="none"
  >
    <path
      d="M1 1l5 5 5-5"
      stroke="#151C27"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ArrowRightIcon = ({ className = "w-3 h-3" }) => (
  <svg className={className} viewBox="0 0 8 12" fill="none">
    <path
      d="M1 1l5.5 5L1 11"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const InfoCircle = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#4500B4" />
    <path
      d="M10 9v5M10 7h.01"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
const BulletCheck = () => (
  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#4500B4" />
    <path
      d="M6 10l3 3 5-5"
      stroke="#fff"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E2E8F8] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 px-6 py-6 bg-white text-left"
      >
        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#151C27]">
          {q}
        </span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white font-['Plus_Jakarta_Sans'] text-sm leading-[22px] text-[#494455]">
          {a}
        </div>
      )}
    </div>
  );
}

// ── Mistake Card ─────────────────────────────────────────────────────────────
function MistakeCard({ emoji, title }) {
  return (
    <div className="flex-1 min-w-[220px] bg-white border border-[#E2E8F8] rounded-2xl p-8 flex flex-col items-center gap-0 shadow-[0_10px_30px_rgba(94,35,220,0.04)]">
      <div className="mb-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-100 flex items-center justify-center text-xl">
          {emoji}
        </div>
      </div>
      <p className="font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#151C27] text-center">
        {title}
      </p>
    </div>
  );
}

// ── Property Category Card ────────────────────────────────────────────────────
function CategoryCard({ gradientClass, heading, desc, cta }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-64 rounded-2xl ${gradientClass} flex items-center justify-center`}
      >
        <svg
          className="w-16 h-16 text-white opacity-40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <div className="pt-4">
        <h3 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
          {heading}
        </h3>
      </div>
      <p className="font-['Plus_Jakarta_Sans'] text-base leading-6 text-[#494455]">
        {desc}
      </p>
      <a
        href="#"
        className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 text-[#4500B4] hover:underline"
      >
        {cta}
      </a>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ReduceEmi() {
  const loanAmount = 5000000;
  const rate = 8.75;
  const tenureMonths = 240;
  const prepay = 500000;

  const origEMI = calcEMI(loanAmount, rate, tenureMonths);
  const { tenureSavedMonths } = calcTenureReduction(
    loanAmount,
    rate,
    tenureMonths,
    prepay,
  );
  const interestSavedEMI =
    calcEMI(loanAmount, rate, tenureMonths) * tenureMonths -
    loanAmount -
    (calcEMI(loanAmount - prepay, rate, tenureMonths) * tenureMonths -
      (loanAmount - prepay));
  const interestSavedTenure = calcInterestSaved(
    loanAmount,
    rate,
    tenureMonths,
    prepay,
  );
  const tenureSavedYears = (tenureSavedMonths / 12).toFixed(1);

  const faqs = [
    {
      q: "Is reducing tenure always better than reducing EMI?",
      a: "In most cases, reducing tenure saves significantly more interest. However, reducing EMI may be better if your monthly budget is tight or you have better investment opportunities that yield more than the loan interest rate.",
    },
    {
      q: "Can I switch between EMI and tenure reduction after deciding?",
      a: "Yes, you can discuss options with your bank at the time of making the prepayment. Always communicate your preference in writing and confirm before processing.",
    },
    {
      q: "Do banks allow me to choose EMI or tenure reduction?",
      a: "Most Indian banks offer both options when you make a lump sum prepayment. However, some lenders may default to one approach — always explicitly inform your bank of your preferred option.",
    },
    {
      q: "Does reducing tenure affect tax benefits?",
      a: "Yes. Reducing tenure means your loan closes sooner, reducing total interest paid — and therefore your Section 24 deductions. However, the overall interest savings typically far outweigh the tax benefit loss.",
    },
  ];

  return (
    <div className="bg-[#F9F9FF] font-['Plus_Jakarta_Sans']">
      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 items-center">
            {/* Left */}
            <div className="flex-1 flex flex-col gap-6 max-w-[712px]">
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-2 bg-[#E2E8F8] rounded-full px-3 py-1 font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 tracking-[0.6px] uppercase text-[#4500B4]">
                  <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none">
                    <path
                      d="M8.5 1v14M1.5 8h14M4 3.5l9 9M13 3.5l-9 9"
                      stroke="#4500B4"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Expert Financial Guide
                </span>
              </div>

              <h1 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-4xl lg:text-5xl leading-[1.17] tracking-[-0.96px] text-[#151C27]">
                Reduce EMI or Reduce Tenure?
              </h1>

              <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-[#494455] max-w-[576px]">
                After making a home loan prepayment, one decision can change
                your financial future. Should you lower your monthly EMI or
                shorten your loan tenure? This page breaks down both options
                with clear logic and real-world impact.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-[#5E23DC] hover:bg-[#4c1cb0] text-white font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] px-8 py-[18px] rounded-lg transition-colors cursor-pointer border-none">
                  Try EMI Calculator
                </button>
                <button className="border-2 border-[#CBC3D8] hover:border-[#5E23DC] text-[#4500B4] bg-transparent font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] px-8 py-4 rounded-lg transition-colors cursor-pointer">
                  View Savings Guide
                </button>
              </div>
            </div>

            {/* Right — illustration + float card */}
            <div className="flex-1 max-w-[712px] w-full relative pb-8 lg:pb-0">
              <div className="bg-gradient-to-br from-[#f0e8ff] to-[#e0d0ff] rounded-3xl h-[340px] flex items-center justify-center shadow-[0_10px_30px_rgba(94,35,220,0.10)]">
                <div className="text-center">
                  <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-br from-[#7B3FE4] to-[#5E23DC] rounded-3xl flex items-center justify-center shadow-[0_16px_40px_rgba(94,35,220,0.3)]">
                    <svg
                      className="w-14 h-14 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#4500B4]">
                    Smart Prepayment
                  </p>
                  <p className="font-['Plus_Jakarta_Sans'] font-normal text-sm text-[#7B5EA7] mt-1">
                    Choose the right strategy
                  </p>
                </div>
              </div>

              {/* Float card */}
              <div className="absolute -left-6 -bottom-6 bg-white border border-[#E2E8F8] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-2xl p-6 w-[236px] flex flex-col gap-2 hidden lg:flex">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-7 rounded-lg bg-[#F0F3FF] flex items-center justify-center">
                    <svg className="w-5 h-3" viewBox="0 0 20 12" fill="none">
                      <path
                        d="M2 10l5-5 4 4 7-8"
                        stroke="#4500B4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 text-[#4500B4]">
                    Higher Savings
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 text-[#494455]">
                  Reducing tenure saves significantly more interest over the
                  loan's total duration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ UNDERSTANDING THE DIFFERENCE ══════════════════════════════════ */}
      <section className="bg-[#F7F0FF] py-16 lg:py-20">
        <div className="max-w-[1312px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-4xl lg:text-6xl leading-tight tracking-[-0.32px] text-[#151C27]">
              Understanding the Difference
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] mt-4 max-w-[672px] mx-auto">
              Compare the two paths to decide which aligns best with your
              immediate cash flow needs and long-term wealth goals.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Option 1 */}
            <div className="flex-1 bg-white border border-[#E2E8F8] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-2xl p-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <h3 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
                  Option 1: Reduce EMI
                </h3>
                <svg
                  className="w-7 h-5 text-[#494455] flex-shrink-0"
                  viewBox="0 0 28 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="1" y="1" width="26" height="18" rx="3" />
                  <path d="M7 10h14M7 14h8" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                When you choose to reduce EMI after prepayment, your loan tenure
                remains the same, but your monthly payment decreases. This
                option provides immediate monthly relief but usually results in
                higher total interest over the loan's lifetime.
              </p>
              <ul className="flex flex-col gap-4 pt-2">
                {[
                  { text: "Lowers monthly EMI", good: true },
                  { text: "Better short-term cash flow", good: true },
                  {
                    text: "Loan continues for the same number of years",
                    good: false,
                  },
                  { text: "Higher total interest paid", good: false },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {item.good ? <CheckGreen /> : <CrossRed />}
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Option 2 */}
            <div className="flex-1 relative bg-white border-2 border-[#5E23DC] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-2xl p-10 flex flex-col gap-6">
              <span className="absolute -top-3.5 right-10 bg-[#5E23DC] text-white font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 px-4 py-1 rounded-full whitespace-nowrap">
                Recommended
              </span>
              <div className="flex justify-between items-start">
                <h3 className="font-['Manrope'] font-semibold text-2xl leading-8 text-[#151C27]">
                  Option 2: Reduce Tenure
                </h3>
                <svg
                  className="w-7 h-7 flex-shrink-0"
                  viewBox="0 0 28 28"
                  fill="none"
                  stroke="#4500B4"
                  strokeWidth="1.6"
                >
                  <circle cx="14" cy="14" r="12" />
                  <path d="M14 8v7l4 4" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                Reducing tenure keeps your EMI unchanged but shortens the loan
                duration. This significantly reduces the number of interest
                cycles, helping you save much more interest and become debt-free
                faster.
              </p>
              <ul className="flex flex-col gap-4 pt-2">
                {[
                  "Maximum interest savings",
                  "Faster loan closure",
                  "Strong long-term financial benefit",
                  "Better wealth creation",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckGreen />
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REAL EMI vs TENURE EXAMPLE ════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-4xl lg:text-6xl leading-tight tracking-[-0.32px] text-[#151C27]">
              A Real EMI vs Tenure Example
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] mt-4 max-w-[700px] mx-auto">
              Consider a realistic scenario to see how the same prepayment
              amount produces very different results depending on the option you
              choose.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F8] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-3xl overflow-hidden">
            {/* Parameters header */}
            <div className="border-b border-[#E2E8F8] flex flex-wrap justify-center gap-8 p-10">
              {[
                { label: "Loan Amount", value: "₹50,00,000", colored: false },
                { label: "Interest Rate", value: "8.75%", colored: false },
                {
                  label: "Prepayment Amount",
                  value: "₹5,00,000",
                  colored: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center flex-1 min-w-[160px]"
                >
                  <p className="font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 text-[#494455] mb-1">
                    {item.label}
                  </p>
                  <p
                    className={`font-['Manrope'] font-semibold text-2xl leading-8 ${item.colored ? "text-[#4500B4]" : "text-[#151C27]"}`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Table + info */}
            <div className="p-10 flex flex-col gap-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-[#E2E8F8]">
                      <th className="text-left font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#494455] pb-4 pr-2">
                        Choice
                      </th>
                      <th className="text-left font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#494455] pb-4 pr-2">
                        Tenure Impact
                      </th>
                      <th className="text-left font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#494455] pb-4">
                        Interest Saved
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E2E8F8]">
                      <td className="font-['Plus_Jakarta_Sans'] font-semibold text-base leading-6 text-[#151C27] py-6 pr-2">
                        Reduce EMI
                      </td>
                      <td className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] py-6 pr-2">
                        No change
                      </td>
                      <td className="font-['Plus_Jakarta_Sans'] font-semibold text-base leading-6 text-[#151C27] py-6">
                        ₹{formatINR(Math.round(Math.max(0, interestSavedEMI)))}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-['Plus_Jakarta_Sans'] font-semibold text-base leading-6 text-[#4500B4] py-6 pr-2">
                        Reduce Tenure
                      </td>
                      <td className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] py-6 pr-2">
                        {tenureSavedYears} yrs shorter
                      </td>
                      <td className="font-['Plus_Jakarta_Sans'] font-bold text-base leading-6 text-[#4CAF50] py-6">
                        ₹{formatINR(Math.round(interestSavedTenure))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Info banner */}
              <div className="bg-[rgba(69,0,180,0.05)] border border-[rgba(69,0,180,0.1)] rounded-xl px-4 py-4 flex items-center gap-3">
                <InfoCircle />
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#4500B4]">
                  Same prepayment. Nearly 2× more interest saved when you reduce
                  tenure instead of EMI.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY REDUCING TENURE USUALLY SAVES MORE ═══════════════════════ */}
      <section className="bg-[#F4F0FF] py-[120px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row gap-16 items-center">
          {/* Left copy */}
          <div className="flex-1 flex flex-col gap-6 max-w-[544px]">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27]">
              Why Reducing Tenure Usually Saves More
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-lg leading-7 text-[#494455]">
              Home loan EMIs are structured so that interest payments are
              highest in the early years. When you reduce tenure, you cut down
              the total number of months for which interest is charged.
            </p>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
              With the same prepayment amount, reducing tenure can save 2–3×
              more interest compared to reducing EMI. This makes it the
              preferred option for borrowers who can comfortably continue with
              their existing EMI.
            </p>
          </div>

          {/* Right stat cards */}
          <div className="flex-1 flex gap-4 max-w-[544px] w-full">
            <div className="flex-1 bg-white rounded-2xl p-8 pb-16 shadow-[0_10px_30px_rgba(94,35,220,0.27)]">
              <p className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-12 text-[#4500B4]">
                2.5x
              </p>
              <p className="font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 text-[#494455] mt-2">
                Avg. Multiplier of Interest Savings
              </p>
            </div>
            <div className="flex-1 pt-8">
              <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(94,35,220,0.2)]">
                <p className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-12 text-[#4500B4]">
                  38%
                </p>
                <p className="font-['Plus_Jakarta_Sans'] font-medium text-xs leading-4 text-[#494455] mt-2">
                  Reduction in Debt Duration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMON MISTAKES ═══════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-4xl lg:text-6xl leading-tight tracking-[-0.32px] text-[#151C27]">
              Common Mistakes Borrowers Make
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455] mt-4 max-w-[672px] mx-auto">
              Being aware of these pitfalls can help you make a more financially
              sound decision that benefits your long-term security.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <MistakeCard
              emoji="😓"
              title="Choosing EMI reduction only for short-term comfort"
            />
            <MistakeCard
              emoji="📊"
              title="Not calculating total interest paid over time"
            />
            <MistakeCard
              emoji="📈"
              title="Ignoring future income growth potential"
            />
            <MistakeCard
              emoji="💰"
              title="Prepaying without keeping an emergency fund"
            />
          </div>
        </div>
      </section>

      {/* ══ TAX BENEFITS ═════════════════════════════════════════════════ */}
      <section className="bg-[#F0F3FF] px-4 py-[120px] sm:px-8 lg:px-16">
        <div className="max-w-[1312px] mx-auto">
          <div className="bg-white border border-[#E2E8F8] shadow-[0_10px_30px_rgba(94,35,220,0.04)] rounded-[32px] flex flex-col lg:flex-row items-center gap-12 p-12">
            {/* Illustration */}
            <div className="flex-shrink-0">
              <div className="w-[250px] h-[250px] rounded-2xl bg-gradient-to-br from-[#E2E8F8] to-[#C7D2F0] flex items-center justify-center">
                <svg
                  className="w-24 h-24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4500B4"
                  strokeWidth="1.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-6 max-w-[670px]">
              <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27]">
                Does Reducing EMI or Tenure Affect Tax Benefits?
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                Reducing tenure or EMI can impact the interest you pay and, as a
                result, the tax deductions you can claim on your home loan.
                While tax benefits under Section 24 are linked to interest paid,
                they should not be the sole factor guiding your decision. In
                most cases, the total interest saved through smart prepayment is
                far greater than the marginal reduction in tax benefits.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  "Section 24 allows deduction up to ₹2 Lakh after prepayment",
                  "Lower interest means slightly lower tax benefits",
                  "Overall interest savings usually far exceed tax benefits lost",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <BulletCheck />
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#151C27]">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQs ══════════════════════════════════════════════════════════ */}
      <section className="px-4 py-[120px] sm:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-12">
          <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27] text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-full max-w-[768px] flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ EXPLORE VERIFIED PROPERTIES ═══════════════════════════════════ */}
      <section className="bg-white px-4 py-[120px] sm:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
          {/* Header row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div className="flex flex-col gap-4 max-w-[672px]">
              <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-[32px] leading-10 tracking-[-0.32px] text-[#151C27]">
                Explore Verified Properties
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] font-normal text-base leading-6 text-[#494455]">
                If you are planning to buy a home, explore verified properties
                with transparent pricing and proper documentation. Buying the
                right property is as important as choosing the right loan
                strategy.
              </p>
            </div>
            <a
              href="#"
              className="flex items-center gap-2 font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#4500B4] hover:underline whitespace-nowrap"
            >
              View All Listings <ArrowRightIcon />
            </a>
          </div>

          {/* Category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard
              gradientClass="bg-gradient-to-br from-[#7B3FE4] to-[#5E23DC]"
              heading="Apartments for Sale"
              desc="Browse ready-to-move and under-construction apartments in prime locations."
              cta="View Apartments →"
            />
            <CategoryCard
              gradientClass="bg-gradient-to-br from-[#34D399] to-[#059669]"
              heading="Plots & Land"
              desc="Discover approved plots suitable for investment or building your dream home."
              cta="View Plots →"
            />
            <CategoryCard
              gradientClass="bg-gradient-to-br from-[#60A5FA] to-[#3B82F6]"
              heading="New Residential Projects"
              desc="Explore newly launched residential projects from trusted developers."
              cta="Explore Projects →"
            />
          </div>
        </div>
      </section>

      {/* ══ RELATED HOME LOAN TOOLS ═══════════════════════════════════════ */}
      <section className="border-t border-[#E2E8F8] px-4 py-[120px] sm:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-['Segoe_UI',system-ui,sans-serif] font-bold text-2xl leading-8 text-[#151C27] mb-8">
            Related Home Loan Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              "Home Loan Prepayment Calculator",
              "Best Time to Prepay Home Loan",
              "Prepay vs Invest Calculator",
            ].map((label) => (
              <a
                key={label}
                href="#"
                className="flex items-center justify-between gap-3 bg-[#F5EDFF] rounded-xl px-6 py-6 font-['Plus_Jakarta_Sans'] font-semibold text-sm leading-5 tracking-[0.28px] text-[#151C27] hover:shadow-[0_4px_16px_rgba(94,35,220,0.12)] transition-shadow"
              >
                <span>{label}</span>
                <ArrowRightIcon className="w-2 h-3 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
