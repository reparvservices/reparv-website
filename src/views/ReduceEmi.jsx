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
              <div className="rounded-3xl h-[400px] flex items-center justify-center shadow-[0_10px_30px_rgba(94,35,220,0.10)] overflow-hidden">
                <img
                  src="/assets/seoPages/reduceEmi/hero.svg"
                  alt="hero image"
                  className="w-full h-full object-cover"
                />
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
          <div className="md:text-center mb-12">
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
          <div className="md:text-center mb-16">
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
              emoji={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 9C13.9167 9 14.2708 8.85417 14.5625 8.5625C14.8542 8.27083 15 7.91667 15 7.5C15 7.08333 14.8542 6.72917 14.5625 6.4375C14.2708 6.14583 13.9167 6 13.5 6C13.0833 6 12.7292 6.14583 12.4375 6.4375C12.1458 6.72917 12 7.08333 12 7.5C12 7.91667 12.1458 8.27083 12.4375 8.5625C12.7292 8.85417 13.0833 9 13.5 9ZM6.5 9C6.91667 9 7.27083 8.85417 7.5625 8.5625C7.85417 8.27083 8 7.91667 8 7.5C8 7.08333 7.85417 6.72917 7.5625 6.4375C7.27083 6.14583 6.91667 6 6.5 6C6.08333 6 5.72917 6.14583 5.4375 6.4375C5.14583 6.72917 5 7.08333 5 7.5C5 7.91667 5.14583 8.27083 5.4375 8.5625C5.72917 8.85417 6.08333 9 6.5 9ZM10 11.5C8.86667 11.5 7.8375 11.8208 6.9125 12.4625C5.9875 13.1042 5.31667 13.95 4.9 15H6.55C6.91667 14.3833 7.40417 13.8958 8.0125 13.5375C8.62083 13.1792 9.28333 13 10 13C10.7167 13 11.3792 13.1792 11.9875 13.5375C12.5958 13.8958 13.0833 14.3833 13.45 15H15.1C14.6833 13.95 14.0125 13.1042 13.0875 12.4625C12.1625 11.8208 11.1333 11.5 10 11.5ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                    fill="#BA1A1A"
                  />
                </svg>
              }
              title="Choosing EMI reduction only for short-term comfort"
            />
            <MistakeCard
              emoji={
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 15H6.5V13H8.5V11.5H6.5V9.5H5V11.5H3V13H5V15ZM10 14.25H15V12.75H10V14.25ZM10 11.75H15V10.25H10V11.75ZM11.1 7.95L12.5 6.55L13.9 7.95L14.95 6.9L13.55 5.45L14.95 4.05L13.9 3L12.5 4.4L11.1 3L10.05 4.05L11.45 5.45L10.05 6.9L11.1 7.95ZM3.25 6.2H8.25V4.7H3.25V6.2ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16ZM2 2V16V2Z"
                    fill="#BA1A1A"
                  />
                </svg>
              }
              title="Not calculating total interest paid over time"
            />
            <MistakeCard
              emoji={
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1 10.5L13.65 9.05C13.8 8.26667 13.575 7.53333 12.975 6.85C12.375 6.16667 11.6 5.9 10.65 6.05L9.2 4.6C9.48333 4.46667 9.77083 4.36667 10.0625 4.3C10.3542 4.23333 10.6667 4.2 11 4.2C12.25 4.2 13.3125 4.6375 14.1875 5.5125C15.0625 6.3875 15.5 7.45 15.5 8.7C15.5 9.03333 15.4667 9.34583 15.4 9.6375C15.3333 9.92917 15.2333 10.2167 15.1 10.5ZM18.3 13.65L16.85 12.25C17.4833 11.7667 18.0458 11.2375 18.5375 10.6625C19.0292 10.0875 19.45 9.43333 19.8 8.7C18.9667 7.01667 17.7708 5.67917 16.2125 4.6875C14.6542 3.69583 12.9167 3.2 11 3.2C10.5167 3.2 10.0417 3.23333 9.575 3.3C9.10833 3.36667 8.65 3.46667 8.2 3.6L6.65 2.05C7.33333 1.76667 8.03333 1.55417 8.75 1.4125C9.46667 1.27083 10.2167 1.2 11 1.2C13.5167 1.2 15.7583 1.89583 17.725 3.2875C19.6917 4.67917 21.1167 6.48333 22 8.7C21.6167 9.68333 21.1125 10.5958 20.4875 11.4375C19.8625 12.2792 19.1333 13.0167 18.3 13.65ZM18.8 19.8L14.6 15.65C14.0167 15.8333 13.4292 15.9708 12.8375 16.0625C12.2458 16.1542 11.6333 16.2 11 16.2C8.48333 16.2 6.24167 15.5042 4.275 14.1125C2.30833 12.7208 0.883333 10.9167 0 8.7C0.35 7.81667 0.791667 6.99583 1.325 6.2375C1.85833 5.47917 2.46667 4.8 3.15 4.2L0.4 1.4L1.8 0L20.2 18.4L18.8 19.8ZM4.55 5.6C4.06667 6.03333 3.625 6.50833 3.225 7.025C2.825 7.54167 2.48333 8.1 2.2 8.7C3.03333 10.3833 4.22917 11.7208 5.7875 12.7125C7.34583 13.7042 9.08333 14.2 11 14.2C11.3333 14.2 11.6583 14.1792 11.975 14.1375C12.2917 14.0958 12.6167 14.05 12.95 14L12.05 13.05C11.8667 13.1 11.6917 13.1375 11.525 13.1625C11.3583 13.1875 11.1833 13.2 11 13.2C9.75 13.2 8.6875 12.7625 7.8125 11.8875C6.9375 11.0125 6.5 9.95 6.5 8.7C6.5 8.51667 6.5125 8.34167 6.5375 8.175C6.5625 8.00833 6.6 7.83333 6.65 7.65L4.55 5.6Z"
                    fill="#BA1A1A"
                  />
                </svg>
              }
              title="Ignoring future income growth potential"
            />
            <MistakeCard
              emoji={
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.025 20.05C9.75833 20.05 9.50417 20 9.2625 19.9C9.02083 19.8 8.8 19.6583 8.6 19.475L0.575 11.45C0.391667 11.25 0.25 11.0292 0.15 10.7875C0.05 10.5458 0 10.2917 0 10.025C0 9.75833 0.05 9.5 0.15 9.25C0.25 9 0.391667 8.78333 0.575 8.6L8.6 0.575C8.8 0.375 9.02083 0.229167 9.2625 0.1375C9.50417 0.0458333 9.75833 0 10.025 0C10.2917 0 10.55 0.0458333 10.8 0.1375C11.05 0.229167 11.2667 0.375 11.45 0.575L19.475 8.6C19.675 8.78333 19.8208 9 19.9125 9.25C20.0042 9.5 20.05 9.75833 20.05 10.025C20.05 10.2917 20.0042 10.5458 19.9125 10.7875C19.8208 11.0292 19.675 11.25 19.475 11.45L11.45 19.475C11.2667 19.6583 11.05 19.8 10.8 19.9C10.55 20 10.2917 20.05 10.025 20.05ZM10.025 18.05L18.05 10.025L10.025 2L2 10.025L10.025 18.05ZM9.025 11.025H11.025V5.025H9.025V11.025ZM10.025 14.025C10.3083 14.025 10.5458 13.9292 10.7375 13.7375C10.9292 13.5458 11.025 13.3083 11.025 13.025C11.025 12.7417 10.9292 12.5042 10.7375 12.3125C10.5458 12.1208 10.3083 12.025 10.025 12.025C9.74167 12.025 9.50417 12.1208 9.3125 12.3125C9.12083 12.5042 9.025 12.7417 9.025 13.025C9.025 13.3083 9.12083 13.5458 9.3125 13.7375C9.50417 13.9292 9.74167 14.025 10.025 14.025Z"
                    fill="#BA1A1A"
                  />
                </svg>
              }
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
              <div className="w-[350px] h-[350px] rounded-2xl bg-gradient-to-br from-[#E2E8F8] to-[#C7D2F0] flex items-center justify-center">
                <img src="/assets/seoPages/ReduceEmi/image.svg" alt="reducing emi image" className="w-full h-full object-cover" />
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
