"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Are these real buyer journeys?",
    a: "Yes. Every journey featured on this page is based on real buyer experiences. Details may be anonymised to protect privacy, but the decisions, trade-offs, and outcomes are authentic.",
  },
  {
    q: "Do buyers regret choosing within budget?",
    a: "Rarely, when the decision was made thoughtfully. Our journeys consistently show that buyers who chose within their comfortable range reported higher satisfaction 6 months post-purchase.",
  },
  {
    q: "Is compromise always required?",
    a: "Not always. Many buyers found that reframing what they truly needed led to decisions that felt like upgrades, not compromises. The key was clarity on priorities.",
  },
  {
    q: "Can I attend guidance sessions before finalising?",
    a: "Absolutely. Our free guidance sessions are designed for buyers still in the decision phase. You don't need to have a property shortlisted — just a budget range and an open mind.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16 sm:py-20 bg-[#f8f5ff]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a0a3d] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#ede8ff] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#1a0a3d] font-semibold text-sm sm:text-base group-hover:text-[#4500B4] transition-colors">
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${open === i ? "bg-[#4500B4] border-[#4500B4] rotate-45" : "border-[#4500B4]/30"}`}>
                  <svg className={`w-3.5 h-3.5 ${open === i ? "text-white" : "text-[#4500B4]"}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </button>

              {open === i && (
                <div className="px-6 pb-5 -mt-1">
                  <div className="h-px bg-[#ede8ff] mb-4" />
                  <p className="text-[#6b6490] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}