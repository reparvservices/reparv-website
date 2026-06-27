export default function HeroSection() {
  return (
    <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-[#ede8ff] to-[#f9f7ff]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/seoPages/budgetJourney/hero.svg')",
        }}
      />
      {/* Stronger purple push on the left where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.30) 58%, rgba(255,255,255,0.08) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#4500B4]/10 border border-[#4500B4]/20 text-[#1a0a3d] md:text-[#5E23DC] text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4500B4] animate-pulse" />
          Real Buyer Home Journeys Report
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1a0a3d] md:text-[#5E23DC] leading-tight mb-5">
          Budget to Dream Home Journeys –{" "}
          <span className="text-[#000] md:text-[#5323DC]">How Buyers Made Smart Choices</span>
        </h1>

        <p className="text-base sm:text-lg text-[#4a4470] md:text-black max-w-xl mx-auto mb-8 leading-relaxed">
          Real stories of buyers who started with budget limits, made thoughtful
          adjustments, and found homes that improved daily life — without
          regret.
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
