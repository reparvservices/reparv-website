"use client";
import { useState } from "react";

// ── Inline Icons ─────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const CrossIcon = () => (
  <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronDown = ({ open }) => (
  <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const InfoIcon = () => (
  <svg className="w-4 h-4 text-violet-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ── helpers ──────────────────────────────────────────────────────────────────
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
  while (balance > 0 && months < tenureMonths) {
    const interest = balance * r;
    balance = balance - (emi - interest);
    months++;
  }
  const saved = tenureMonths - months;
  return { newEMI: emi, tenureSavedMonths: Math.max(0, saved) };
}
function calcInterestSaved(P, rAnnual, tenureMonths, prepay) {
  const r = rAnnual / 12 / 100;
  const emi = calcEMI(P, rAnnual, tenureMonths);
  const totalInterestOrig = emi * tenureMonths - P;

  let balance = P - prepay;
  let totalInterestNew = 0;
  for (let i = 0; i < tenureMonths && balance > 0; i++) {
    const interest = balance * r;
    totalInterestNew += interest;
    balance -= emi - interest;
  }
  return Math.max(0, totalInterestOrig - totalInterestNew);
}

// ── FAQ component ─────────────────────────────────────────────────────────────
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left gap-4 py-4 px-5">
        <span className="text-sm sm:text-base text-gray-800 font-medium">{q}</span>
        <ChevronDown open={open} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</div>
      )}
    </div>
  );
}

// ── Mistake Card ──────────────────────────────────────────────────────────────
function MistakeCard({ icon, title }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl">{icon}</div>
      <p className="text-sm font-medium text-gray-700 leading-snug">{title}</p>
    </div>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ title, desc, cta, bgClass }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-40 ${bgClass} flex items-center justify-center`}>
        <svg className="w-14 h-14 text-white opacity-50" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      <div className="p-4 bg-white">
        <h4 className="font-semibold text-gray-800 text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">{desc}</p>
        <a href="#" className="text-violet-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          {cta} <ArrowRight />
        </a>
      </div>
    </div>
  );
}

// ── Related Tool Link ─────────────────────────────────────────────────────────
function ToolLink({ label }) {
  return (
    <a href="#" className="flex items-center justify-between gap-3 px-5 py-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-violet-300 hover:shadow-md transition-all group">
      <span className="text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors">{label}</span>
      <ArrowRight />
    </a>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function ReduceEmi() {
  const [openFaq, setOpenFaq] = useState(null);

  // Example calculation: ₹50L loan, 8.75%, 5L prepay, 20yr
  const loanAmount = 5000000;
  const rate = 8.75;
  const tenureMonths = 240;
  const prepay = 500000;

  const origEMI = calcEMI(loanAmount, rate, tenureMonths);
  const { tenureSavedMonths } = calcTenureReduction(loanAmount, rate, tenureMonths, prepay);
  const interestSavedEMI = (calcEMI(loanAmount, rate, tenureMonths) * tenureMonths - loanAmount) -
    (calcEMI(loanAmount - prepay, rate, tenureMonths) * tenureMonths - (loanAmount - prepay));
  const interestSavedTenure = calcInterestSaved(loanAmount, rate, tenureMonths, prepay);

  const tenureSavedYears = (tenureSavedMonths / 12).toFixed(1);

  const faqs = [
    {
      q: "Is reducing tenure always better than reducing EMI?",
      a: "In most cases, reducing tenure saves significantly more interest. However, reducing EMI may be better if your monthly budget is tight or you have better investment opportunities that yield more than the loan interest rate.",
    },
    {
      q: "Can I switch between EMI and tenure reduction after deciding?",
      a: "Yes, you can usually discuss options with your bank at the time of making the prepayment. It's best to communicate your preference in writing and confirm with your lender before processing.",
    },
    {
      q: "Do banks allow me to choose EMI or tenure reduction?",
      a: "Most Indian banks offer both options when you make a lump sum prepayment. However, some lenders may default to one approach. Always explicitly inform your bank of your preferred option.",
    },
    {
      q: "Does reducing tenure affect tax benefits?",
      a: "Yes, reducing tenure means your loan closes sooner, which reduces the total interest you pay — and therefore reduces your Section 24 deductions on home loan interest. However, the overall financial savings from interest reduction typically outweigh the tax benefit loss.",
    },
  ];

  return (
    <div className="bg-white font-sans text-gray-800 min-w-0">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-violet-50 to-white py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb badge */}
          <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            EXPERT FINANCIAL GUIDE
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Reduce EMI or Reduce Tenure?
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-xl">
                After making a home loan prepayment, one decision can change your financial future. Should you lower your monthly EMI or shorten your loan tenure? This page breaks down both options with clear logic and real-world impact.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
                  Try EMI Calculator
                </button>
                <button className="border border-violet-300 text-violet-700 hover:bg-violet-50 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                  View Savings Guide
                </button>
              </div>
            </div>
            {/* Illustration card */}
            <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-full opacity-60" />
                {/* Calendar illustration */}
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-violet-50 rounded-xl p-3 flex items-start gap-2">
                  <svg className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold text-violet-700">Higher Savings</p>
                    <p className="text-xs text-violet-600 mt-0.5">Reducing tenure saves significantly more interest over the loan's total duration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Understanding the Difference ─────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Understanding the Difference</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">Compare the two paths to decide which aligns best with your immediate cash flow needs and long-term wealth goals.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Option 1: Reduce EMI */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800">Option 1: Reduce EMI</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                When you choose to reduce EMI after the prepayment, your loan tenure remains the same, but your monthly payment decreases. This option provides immediate monthly relief but usually results in higher total interest over the loan's lifetime.
              </p>
              <ul className="space-y-2.5">
                {[
                  { text: "Lowers monthly EMI", good: true },
                  { text: "Better short-term cash flow", good: true },
                  { text: "Loan continues for the same number of years", good: false },
                  { text: "Higher total interest paid", good: false },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    {item.good ? <CheckIcon /> : <CrossIcon />} {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Option 2: Reduce Tenure */}
            <div className="bg-violet-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">
                RECOMMENDED
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white">Option 2: Reduce Tenure</h3>
              </div>
              <p className="text-sm text-white/90 mb-4 leading-relaxed">
                Reducing tenure keeps your EMI unchanged but shortens the loan duration. This significantly reduces the number of interest cycles, helping you save much more in total and become debt-free faster.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Maximum interest savings",
                  "Faster loan closure",
                  "Strong long-term financial benefit",
                  "Better wealth creation",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                    <svg className="w-4 h-4 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Real EMI vs Tenure Example ───────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">A Real EMI vs Tenure Example</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              Consider a realistic scenario to see how the same prepayment amount produces very different results depending on the option you choose.
            </p>
          </div>

          {/* Input row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Loan Amount", value: "₹50,00,000", color: "text-gray-800" },
              { label: "Interest Rate", value: "8.75%", color: "text-gray-800" },
              { label: "Prepayment Amount", value: "₹5,00,000", color: "text-violet-600" },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center shadow-sm">
                <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Choice</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Tenure Impact</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Interest Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">Reduce EMI</td>
                    <td className="px-6 py-4 text-sm text-gray-500">No change</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-gray-800">
                        ₹{formatINR(Math.round(Math.max(0, interestSavedEMI)))} lakh
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-violet-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-violet-600">Reduce Tenure</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tenureSavedYears} years shorter</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-violet-600">
                        ₹{formatINR(Math.round(interestSavedTenure))} lakh
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
              <InfoIcon />
              <p className="text-xs text-amber-700 font-medium">
                Same prepayment. Nearly 2× higher savings when you reduce tenure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Reducing Tenure Usually Saves More ───────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Why Reducing Tenure Usually Saves More
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Home loan EMIs are structured so that interest payments are highest in the early years. When you reduce tenure, you cut down the total number of months for which interest is charged.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                With the same prepayment amount, reducing tenure can save 2–3× more interest compared to reducing EMI. This makes it the preferred option for borrowers who can comfortably continue with their existing EMI.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-violet-600 rounded-2xl p-6 text-white text-center">
                <p className="text-4xl font-black mb-1">2.5<span className="text-2xl">×</span></p>
                <p className="text-xs text-white/80 leading-snug">Avg. Multiple of Interest Savings</p>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 text-white text-center">
                <p className="text-4xl font-black mb-1">38<span className="text-2xl">%</span></p>
                <p className="text-xs text-white/80 leading-snug">Reduction in Total Interest Paid</p>
              </div>
              <div className="col-span-2 bg-violet-50 rounded-2xl p-5 border border-violet-100">
                <p className="text-sm text-violet-800 font-medium text-center leading-relaxed">
                  Most financial advisors recommend reducing tenure for borrowers with stable income and no urgent need for increased monthly cash flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common Mistakes ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Common Mistakes Borrowers Make</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Being aware of these pitfalls can help you make a more financially sound decision that benefits your long-term security.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MistakeCard icon="😓" title="Choosing EMI reduction only for short-term comfort" />
            <MistakeCard icon="📊" title="Not calculating total interest paid over time" />
            <MistakeCard icon="📈" title="Ignoring future income growth potential" />
            <MistakeCard icon="💰" title="Prepaying without keeping an emergency fund" />
          </div>
        </div>
      </section>

      {/* ── Tax Benefits ─────────────────────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-3xl overflow-hidden border border-violet-100">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Illustration */}
              <div className="bg-gradient-to-br from-violet-100 to-indigo-100 p-10 flex items-center justify-center min-h-[220px]">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-md flex items-center justify-center mb-3">
                    <svg className="w-10 h-10 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                  </div>
                  <p className="text-violet-700 font-semibold text-sm">Tax Impact</p>
                  <p className="text-xs text-violet-500 mt-1">Section 24 & 80C</p>
                </div>
              </div>
              {/* Content */}
              <div className="p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  Does Reducing EMI or Tenure Affect Tax Benefits?
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Reducing tenure or EMI can impact the interest you pay and, as a result, the tax benefits. While tax benefit from Section 24 depends on the interest paid, they should not be the sole factor guiding your decision. In most cases, the total interest saved through smart prepayments is far greater than the marginal reduction in tax benefits.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    { icon: "📋", text: "Section 24 deductions depend on interest paid during the year" },
                    { icon: "↘️", text: "Lower interest means slightly lower tax benefits" },
                    { icon: "✅", text: "Overall interest savings usually far exceed tax benefits lost" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="text-base">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
                <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm">
                  Calculate Tax Impact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100 overflow-hidden">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Verified Properties ──────────────────────────────────── */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Explore Verified Properties</h2>
            <a href="#" className="text-violet-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
              View All Listings <ArrowRight />
            </a>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            If you are planning to buy a home, explore verified properties with transparent pricing and proper documentation. Buying the right property is as important as choosing the right loan strategy.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <PropertyCard
              title="Apartments for Sale"
              desc="Browse ready-to-move and under-construction apartments across top cities."
              cta="View Apartments"
              bgClass="bg-gradient-to-br from-violet-500 to-violet-700"
            />
            <PropertyCard
              title="Plots & Land"
              desc="Explore approved plots suitable for investment or home construction."
              cta="View Plots"
              bgClass="bg-gradient-to-br from-emerald-400 to-teal-600"
            />
            <PropertyCard
              title="New Residential Projects"
              desc="Explore newly launched residential projects from trusted developers."
              cta="Explore Projects"
              bgClass="bg-gradient-to-br from-blue-400 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* ── Related Home Loan Tools ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Related Home Loan Tools</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <ToolLink label="Home Loan Prepayment Calculator" />
            <ToolLink label="Best Time to Prepay Home Loan" />
            <ToolLink label="Prepay vs Invest Calculator" />
          </div>
        </div>
      </section>

    </div>
  );
}