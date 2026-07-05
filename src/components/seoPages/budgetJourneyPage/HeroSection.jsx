import {
  formatBudgetRange,
  formatVerifiedStatValue,
} from "@/utils/budgetToDreamHomePage";

export default function HeroSection({ pageData = null }) {
  const city = pageData?.city || "Nagpur";
  const stats = pageData?.stats || {};
  const budgetLabel = formatBudgetRange(stats.minPrice, stats.maxPrice);

  return (
    <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-[#ede8ff] to-[#f9f7ff]">
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-20">
        <div className="inline-flex items-center gap-2 bg-[#4500B4]/10 border border-[#4500B4]/20 text-[#1a0a3d] md:text-[#5E23DC] text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4500B4] animate-pulse" />
          {stats.budgetHomes
            ? `${formatVerifiedStatValue(stats.budgetHomes)} Smart-Budget Homes in ${city}`
            : "Real Buyer Home Journeys Report"}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1a0a3d] md:text-[#5E23DC] leading-tight mb-5">
          Budget to Dream Home Journeys –{" "}
          <span className="text-[#000] md:text-[#5323DC]">How Buyers Made Smart Choices</span>
        </h1>

        <p className="text-base sm:text-lg text-[#4a4470] md:text-black max-w-xl mx-auto mb-8 leading-relaxed">
          Real stories of {city} buyers who started with budget limits between{" "}
          {budgetLabel}, made thoughtful adjustments across{" "}
          {stats.localities ? `${stats.localities}+ localities` : "many areas"},
          and found homes that improved daily life — without regret.
        </p>

        <a
          href="#stories"
          className="inline-block bg-[#4500B4] hover:bg-[#5323DC] text-white font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#4500B4]/30 hover:shadow-[#5323DC]/40 hover:-translate-y-0.5"
        >
          Read Their Stories
        </a>
      </div>
    </section>
  );
}
