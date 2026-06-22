export default function HeroSection() {
  return (
    <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5f0ff] via-[#ede8ff] to-[#f9f7ff]">
      {/* Soft background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4500B4]/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#5323DC]/6 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {/* Decorative home illustration (right side) */}
      <div className="absolute right-8 bottom-0 hidden lg:flex items-end gap-4 opacity-20 pointer-events-none">
        <div className="w-32 h-40 bg-[#4500B4] rounded-t-full" />
        <div className="w-20 h-28 bg-[#5323DC] rounded-t-full" />
        <div className="w-14 h-20 bg-[#7c5ce4] rounded-t-full" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto py-20">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-[#4500B4]/10 border border-[#4500B4]/20 text-[#4500B4] text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4500B4] animate-pulse" />
          Real Buyer Home Journeys Report
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1a0a3d] leading-tight mb-5">
          Budget to Dream Home Journeys –{" "}
          <span className="text-[#4500B4]">How Buyers Made Smart Choices</span>
        </h1>

        <p className="text-base sm:text-lg text-[#4a4470] max-w-xl mx-auto mb-8 leading-relaxed">
          Real stories of buyers who started with budget limits, made thoughtful adjustments, and found homes that improved daily life — without regret.
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