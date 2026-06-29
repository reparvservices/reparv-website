const before = [
  { title: "Comparison Anxiety", desc: "Constant comparison with others' homes leads to dissatisfaction." },
  { title: "FOMO Pressure", desc: "Fear of missing out on anything 'better' and beyond reach." },
  { title: "Financial Doubt", desc: "Persistent doubt on whether the budget is truly enough." },
];

const after = [
  { title: "Clarity & Focus", desc: "Clarity about what truly matters in the home journey." },
  { title: "Sustainable Calendar", desc: "Clear milestones and a manageable timeline takes over." },
  { title: "Sustainable Choice", desc: "Deep satisfaction in a sustainable long-term decision." },
];

export default function BudgetShift() {
  return (
    <section className="py-16 sm:py-20 bg-[linear-gradient(180deg,#5E23DC_0%,#3F2D62_100%)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#5323DC] rounded-full opacity-30 blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#3a00a0] rounded-full opacity-40 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
            How Budget Thinking Changes After the Right Decision
          </h2>
          <p className="text-purple-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Hear from buyers who share what changed emotionally and practically once they truly committed to their real journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <h3 className="text-white font-bold text-lg">Before the Decision</h3>
            </div>
            <div className="space-y-4">
              {before.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-400/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{b.title}</p>
                    <p className="text-purple-200 text-xs leading-relaxed mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <h3 className="text-white font-bold text-lg">After the Decision</h3>
            </div>
            <div className="space-y-4">
              {after.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm">{a.title}</p>
                    <p className="text-purple-200 text-xs leading-relaxed mt-0.5">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}