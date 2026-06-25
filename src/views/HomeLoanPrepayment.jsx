"use client";
import { useState } from "react";

// ── icons (inline SVG to avoid any dependency) ──────────────────────────────
const CheckIcon = () => (
  <svg className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const CrossIcon = () => (
  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

// ── helpers ──────────────────────────────────────────────────────────────────
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
  const totalWithout = emi * n;
  const interestWithout = totalWithout - P;

  // Prepay 10% of principal at month 12
  const prepay = P * 0.1;
  let balance = P;
  let totalInterestWith = 0;
  let monthsPaid = 0;
  for (let i = 1; i <= n; i++) {
    const interest = balance * r;
    totalInterestWith += interest;
    balance = balance - (emi - interest);
    monthsPaid++;
    if (i === 12 && balance > 0) {
      balance = Math.max(0, balance - prepay);
    }
    if (balance <= 0) break;
  }
  const interestSaved = interestWithout - totalInterestWith;
  const tenureReduced = n - monthsPaid;
  return { emi, interestSaved: Math.max(0, interestSaved), tenureReduced: Math.max(0, tenureReduced), interestWithout };
}

// ── range slider ─────────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange, display }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-800">{display}</span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-200">
        <div className="absolute top-0 left-0 h-2 rounded-full bg-violet-600" style={{ width: `${pct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-violet-600 border-2 border-white shadow" style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

// ── FAQ item ─────────────────────────────────────────────────────────────────
function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center text-left gap-3">
        <span className="text-sm sm:text-base font-medium text-gray-800">{q}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}><ChevronDown /></span>
      </button>
      {open && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
}

// ── Guide Card ────────────────────────────────────────────────────────────────
function GuideCard({ title, desc, cta, href = "#" }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
        <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <a href={href} className="text-violet-600 text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
        {cta} <ArrowRight />
      </a>
    </div>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function PropertyCard({ title, desc, cta, bg }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`h-36 ${bg} flex items-center justify-center`}>
        <svg className="w-12 h-12 text-white opacity-60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
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

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function HomeLoanPrepayment() {
  const [loanAmount, setLoanAmount] = useState(8000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(16);
  const [activeTab, setActiveTab] = useState("reduce-tenure");
  const [openFaq, setOpenFaq] = useState(null);

  const { emi, interestSaved, tenureReduced, interestWithout } = calcSavings(loanAmount, interestRate, tenure);
  const totalEMI = calcEMI(loanAmount, interestRate, tenure);
  const totalPayable = totalEMI * tenure * 12;
  const totalInterest = totalPayable - loanAmount;
  const tenureReducedYears = (tenureReduced / 12).toFixed(1);

  const faqs = [
    {
      q: "Is home loan prepayment always beneficial?",
      a: "Prepayment is beneficial in most cases. However, it depends on your interest rate, remaining tenure, prepayment charges, and alternative investment returns. If loan interest is higher than expected investment returns, prepayment makes more financial sense.",
    },
    {
      q: "Should I reduce EMI or reduce tenure after prepayment?",
      a: "Reducing tenure saves significantly more interest over the loan's lifetime. Reducing EMI improves monthly cash flow. Choose based on your financial goals — reducing tenure is generally recommended if your finances are stable.",
    },
    {
      q: "Are there any charges for home loan prepayment?",
      a: "For floating rate home loans taken from banks, RBI has mandated no prepayment penalty. However, fixed-rate loans or loans from NBFCs may have charges. Always check your loan agreement or contact your lender before prepaying.",
    },
    {
      q: "What is the best time to prepay a home loan?",
      a: "The earlier you prepay, the more interest you save — since interest in EMIs is front-loaded. Prepaying in the first 5–7 years is most impactful, but any early prepayment yields better results than later stage prepayment.",
    },
  ];

  const prepayRows = [
    { amount: "₹1,00,000", interest: `₹${formatINR(Math.round(interestSaved * 0.1))} saved`, tenure: "7 months reduced" },
    { amount: "₹5,00,000", interest: `₹${formatINR(Math.round(interestSaved * 0.5))} saved`, tenure: "3–4 years reduced" },
    { amount: "₹10,00,000", interest: `₹${formatINR(Math.round(interestSaved))} saved`, tenure: `${tenureReducedYears} years reduced` },
  ];

  return (
    <div className="bg-white font-sans text-gray-800 min-w-0">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              Home Loan Prepayment Calculator:{" "}
              <span className="text-violet-600">Save Interest &amp; Reduce Loan Tenure</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed max-w-xl">
              Reconnect to a bonus or extra funds? Use this calculator to clearly understand whether prepaying your home loan will help you reduce your monthly EMI or shorten your loan tenure and save lakhs in interest over time.
            </p>
            <div className="flex flex-wrap gap-3 mb-5">
              <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm">
                Calculate Prepayment Savings
              </button>
              <button className="border border-violet-600 text-violet-600 hover:bg-violet-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
                Reduce EMI or Tenure?
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {["Bank-neutral", "No sales bias", "Instant results"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Right — guide card */}
          <div className="w-full lg:w-64 xl:w-72 flex-shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="bg-gradient-to-br from-violet-700 to-violet-500 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest opacity-80 mb-1">Home Loan</p>
                <h3 className="text-lg font-bold leading-tight mb-0.5">PREPAYMENT GUIDE</h3>
                <p className="text-xs opacity-70">SAVE MORE, LIVE SOONER</p>
              </div>
              <div className="bg-white p-4 space-y-2">
                {["Understand when to prepay","Compare EMI vs tenure options","Calculate your exact savings"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckIcon /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Sliders */}
            <div className="lg:col-span-3 p-6">
              <h2 className="text-base font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">Loan Details</h2>
              <Slider
                label="LOAN AMOUNT (₹)"
                value={loanAmount}
                min={500000} max={10000000} step={100000}
                onChange={setLoanAmount}
                display={formatLakh(loanAmount)}
              />
              <Slider
                label="INTEREST RATE (%)"
                value={interestRate}
                min={6} max={15} step={0.1}
                onChange={setInterestRate}
                display={`${interestRate}%`}
              />
              <Slider
                label="OUTSTANDING TENURE (YEARS)"
                value={tenure}
                min={1} max={30} step={1}
                onChange={setTenure}
                display={`${tenure} Years`}
              />
            </div>
            {/* Summary */}
            <div className="lg:col-span-2 p-6 bg-gray-50 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100">Summary</h2>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Original EMI", value: `₹${formatINR(Math.round(totalEMI))}` },
                    { label: "Tax Amount", value: `₹${formatINR(Math.round(totalInterest * 0.05))}` },
                  ].map(item => (
                    <div key={item.label} className="bg-white rounded-xl p-3 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                      <p className="text-sm font-bold text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-violet-600 rounded-xl p-4 text-white mb-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    </div>
                    <span className="text-xs font-medium opacity-90">Potential Savings</span>
                  </div>
                  <p className="text-2xl font-bold mb-0.5">₹{formatINR(Math.round(interestSaved))}</p>
                  <p className="text-xs opacity-80">Interest Reduced</p>
                </div>
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-0.5">Tenure Reduced</p>
                  <p className="text-lg font-bold text-violet-600">{tenureReducedYears} Years</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors shadow-sm">
                Apply For Loan!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reduce EMI vs Reduce Tenure ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Reduce EMI vs Reduce Tenure:{" "}
            <span className="text-violet-600">Which Saves More?</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2">Compare the long-term impact of your prepayment strategy</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Reduce EMI */}
          <div
            onClick={() => setActiveTab("reduce-emi")}
            className={`cursor-pointer rounded-2xl border-2 p-6 transition-all ${activeTab === "reduce-emi" ? "border-violet-600 bg-violet-50 shadow-md" : "border-gray-200 bg-white hover:border-violet-300"}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800">Reduce EMI</h3>
            </div>
            <ul className="space-y-2">
              {["Monthly EMI reduces", "Improves short-term cash flow", "Lower total monthly outgo"].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><CheckIcon />{item}</li>
              ))}
            </ul>
          </div>

          {/* Reduce Tenure */}
          <div
            onClick={() => setActiveTab("reduce-tenure")}
            className={`cursor-pointer rounded-2xl border-2 p-6 transition-all relative ${activeTab === "reduce-tenure" ? "border-violet-600 bg-violet-50 shadow-md" : "border-gray-200 bg-white hover:border-violet-300"}`}
          >
            {activeTab === "reduce-tenure" && (
              <span className="absolute top-3 right-3 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">RECOMMENDED</span>
            )}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800">Reduce Tenure</h3>
            </div>
            <ul className="space-y-2">
              {["EMI stays the same", "Maximum interest saved", "Become debt-free sooner", "Loan closes years earlier"].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><CheckIcon />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 text-center bg-amber-50 border border-amber-200 rounded-xl py-3 px-4">
          <p className="text-sm text-amber-800 font-medium">
            With the same prepayment amount, reducing tenure can save 2–3× more interest than reducing EMI.
          </p>
        </div>
      </section>

      {/* ── What Happens If You Prepay Today ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">What Happens If You Prepay Today?</h2>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="bg-violet-600 text-white">
                  <th className="text-left text-sm font-semibold px-5 py-3.5">Prepayment Amount</th>
                  <th className="text-left text-sm font-semibold px-5 py-3.5">Interest Saved</th>
                  <th className="text-left text-sm font-semibold px-5 py-3.5">Tenure Reduced</th>
                </tr>
              </thead>
              <tbody>
                {prepayRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">{row.amount}</td>
                    <td className="px-5 py-4 text-sm text-green-600 font-medium">{row.interest}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{row.tenure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 px-1">
          *If ₹10 lakh today can save you ₹{formatINR(Math.round(interestSaved))} in interest over time. These examples highlight the power of early prepayment.
        </p>
      </section>

      {/* ── Should You Prepay or Invest ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
              Should You Prepay Your Home Loan or Invest the Money?
            </h2>
            {/* Prepay If */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Prepay If</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "Loan interest rate is higher than expected investment returns",
                  "You have a sufficient emergency fund",
                  "Your income is stable",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
            {/* Avoid Prepaying If */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800">Avoid Prepaying If</h3>
              </div>
              <ul className="space-y-2">
                {[
                  "You'll get better investment returns elsewhere",
                  "Your monthly cash flow is tight",
                  "There is job or income uncertainty",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600"><CrossIcon />{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Image placeholder */}
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full min-h-[260px] bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-50 flex items-center justify-center">
            <div className="text-center p-8 opacity-50">
              <svg className="w-20 h-20 mx-auto text-amber-400 mb-3" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="text-amber-600 text-sm font-medium">Your Dream Home</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Time to Prepay ──────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Best Time to Prepay Your Home Loan</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              In the initial years of a home loan, a large portion of your EMI goes toward paying interest rather than the principal amount. This is due to the way amortisation works.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              As a result, making prepayments during the early phase of your loan — typically within the first 5 to 7 years — can dramatically reduce the total interest payable. Late-stage prepayments, while still helpful, usually offer less benefit compared to early action.
            </p>
          </div>
        </div>
      </section>

      {/* ── Explore More Home Loan Guides ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Explore More Home Loan Guides</h2>
            <p className="text-sm text-gray-500 mt-1">Master your mortgage with our expert resources</p>
          </div>
          <a href="#" className="text-violet-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
            View All Guides <ArrowRight />
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <GuideCard
            title="Home Loan EMI Calculator"
            desc="Calculate your monthly EMI based on your loan amount, interest rate, and tenure."
            cta="Calculate EMI"
          />
          <GuideCard
            title="Reduce EMI or Reduce Tenure?"
            desc="A decision which option works better for you. What gives a better result? See for yourself."
            cta="Compare Options"
          />
          <GuideCard
            title="Best Time to Prepay Home Loan"
            desc="Loan when to prepay so it maximises savings during your loan's lifetime."
            cta="Read Guide"
          />
        </div>
      </section>

      {/* ── Explore Verified Properties ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Explore Verified Properties</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PropertyCard
            title="Apartments for Sale"
            desc="Browse ready-to-move and under-construction apartments across top cities."
            cta="View Properties"
            bg="bg-gradient-to-br from-violet-500 to-violet-700"
          />
          <PropertyCard
            title="Plots &amp; Land"
            desc="Find verified plots for investment or home construction with full legal clarity."
            cta="View Plots"
            bg="bg-gradient-to-br from-emerald-400 to-teal-600"
          />
          <PropertyCard
            title="New Residential Projects"
            desc="Discover newly launched projects from trusted builders across major cities."
            cta="Explore Projects"
            bg="bg-gradient-to-br from-blue-400 to-indigo-600"
          />
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <FAQ key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className="bg-violet-600 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Still confused whether to prepay or invest?</h2>
          <p className="text-sm opacity-80 mb-6">Get a bank-neutral opinion before making a big financial decision</p>
          <button className="bg-white text-violet-700 font-bold text-sm px-8 py-3 rounded-xl hover:bg-violet-50 transition-colors shadow-md">
            Talk to a Reparv Advisor
          </button>
        </div>
      </section>
    </div>
  );
}