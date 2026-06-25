const dilemmas = [
  {
    icon: "🏠",
    title: "Smaller Home vs Better Area",
    desc: "Choosing between less space in a location that improves daily life and long-term future value.",
  },
  {
    icon: "💳",
    title: "EMI Comfort vs Dream Features",
    desc: "Deciding how much financial flexibility matters compared to aspirational amenities.",
  },
  {
    icon: "📍",
    title: "Distance vs Daily Convenience",
    desc: "Balancing longer commutes against the comfort of nearby essentials and local services.",
  },
  {
    icon: "📈",
    title: "Present Affordability vs Future Growth",
    desc: "Weighing today's comfort against long-term appreciation and lifestyle evolution.",
  },
];

export default function BudgetDilemmas() {
  return (
    <section className="py-16 sm:py-20 bg-[#F6F2FB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a0a3d] mb-3">Common Budget Dilemmas</h2>
        <p className="text-[#6b6490] text-sm sm:text-base max-w-xl mx-auto mb-12 leading-relaxed">
          These dilemmas are not signs of poor planning. They are natural questions buyers face when balancing comfort and affordability.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {dilemmas.map((d, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-[#ede8ff] text-left hover:shadow-lg hover:border-[#5323DC]/30 transition-all duration-200"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5 w-10 h-10 bg-[#E8DDFF] rounded-lg flex items-center justify-center">
                {d.icon}
              </span>
              <div>
                <h3 className="text-[#4500B4] font-semibold text-base mb-1">{d.title}</h3>
                <p className="text-[#6b6490] text-sm leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}