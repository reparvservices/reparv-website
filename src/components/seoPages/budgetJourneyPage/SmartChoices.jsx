"use client";

import Link from "next/link";
import { openAgentAdvisor } from "@/utils/openAgentAdvisor";
import { buildBudgetPropertiesLink } from "@/utils/budgetToDreamHomePage";

const values = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.171-.879-1.171-2.303 0-3.182.53-.398 1.196-.62 1.875-.62.76-.001 1.495.215 2.128.627" />
      </svg>
    ),
    title: "Savings Buffer",
    desc: "Every buyer maintained a post-purchase emergency fund for unexpected repairs.",
    color: "bg-[#4500B4]/10 text-[#4500B4]",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Family Peace",
    desc: "Homes chosen within budget created harmony. Financial stress within the family can be avoided.",
    color: "bg-[#5323DC]/10 text-[#5323DC]",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Manageable Routine",
    desc: "EMIs that felt manageable stabilised their daily lives and financial routines.",
    color: "bg-[#4500B4]/10 text-[#4500B4]",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Financial Safety",
    desc: "Staying within budget ensured long-term financial stability, not just a short-term purchase.",
    color: "bg-[#5323DC]/10 text-[#5323DC]",
  },
];

export default function SmartChoices({ city = "Nagpur", pageData = null }) {
  const propertiesLink = buildBudgetPropertiesLink(
    city,
    pageData?.stats?.maxPrice || 6000000,
  );

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="block w-8 h-0.5 bg-[#4500B4]" />
          <p className="text-[#4500B4] text-sm font-semibold tracking-wide uppercase">
            The Non-Negotiables
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a0a3d] mb-3">
          What Smart Buyers Did Not Compromise On
        </h2>
        <p className="text-[#6b6490] text-sm sm:text-base max-w-xl mb-10 leading-relaxed">
          These are the non-negotiable decisions that protected their long-term stability, joy, and financial wellbeing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-[#ffffff] rounded-2xl p-6 border border-[#ede8ff] hover:shadow-md transition-shadow duration-200 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${v.color} group-hover:scale-110 transition-transform duration-200`}
              >
                {v.icon}
              </div>
              <h3 className="text-[#1a0a3d] font-semibold text-sm mb-2">{v.title}</h3>
              <p className="text-[#6b6490] text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-[#4500B4] rounded-2xl p-6 sm:p-8">
            <h3 className="text-white font-bold text-lg mb-2">Explore More Budget Journeys</h3>
            <p className="text-purple-200 text-sm mb-5 leading-relaxed">
              Browse smart-budget homes in {city} and read how buyers made clarity-led choices.
            </p>
            <Link
              href={propertiesLink}
              className="inline-block bg-white text-[#4500B4] font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-purple-50 transition-colors no-underline"
            >
              Explore Homes
            </Link>
          </div>

          <div className="bg-[#5F5D69] rounded-2xl p-6 sm:p-8">
            <h3 className="text-white font-bold text-lg mb-2">Free Buying Guidance Session</h3>
            <p className="text-purple-200 text-sm mb-5 leading-relaxed">
              A 30-minute session to help you move from budget stress to buying something real.
            </p>
            <button
              type="button"
              onClick={() =>
                openAgentAdvisor(
                  `I am planning a budget-conscious home purchase in ${city} and want a free buying guidance session.`,
                )
              }
              className="border border-white/40 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
            >
              Attend Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
