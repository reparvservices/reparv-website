
export default function RiskWithout712Verification() {
  const risks = [
    {
      title: "Ownership Disputes",
      description:
        "Multiple claimants may emerge after purchase. Without verified 7/12, you cannot prove clear title. Legal battles can last years and cost lakhs in fees while your investment remains stuck.",
      icon: "/assets/seopageassets/verify712/risk-dispute.svg",
    },
    {
      title: "Government Acquisition",
      description:
        "Land marked for government projects, forest land, or public utilities can be acquired. 7/12 reveals such restrictions. You'll lose your investment with minimal compensation if acquired.",
      icon: "/assets/seopageassets/verify712/risk-government.svg",
    },
    {
      title: "Loan Rejection",
      description:
        "Banks and NBFCs require verified 7/12 for any land-related loan. Without proper documentation, you cannot get financing for construction or agriculture. Your plans will remain on paper.",
      icon: "/assets/seopageassets/verify712/risk-loan.svg",
    },
    {
      title: "NA Conversion Block",
      description:
        "Cannot convert agricultural land to non-agricultural use without clear 7/12. Your construction plans, resale, or commercial development will be legally blocked indefinitely.",
      icon: "/assets/seopageassets/verify712/risk-na.svg",
    },
  ];

  return (
    <section className="bg-[#FAF7FF] py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-5xl font-bold text-[#3F2D62]">
            Risks of Buying Land Without 7/12 Verification
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Protect yourself from these serious consequences
          </p>
        </div>

        {/* RISK CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {risks.map((risk) => (
            <RiskCard key={risk.title} {...risk} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===============================
   RISK CARD
   =============================== */

function RiskCard({ title, description, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#FF3B30] shadow-sm hover:shadow-md transition">
      {/* ICON */}
      <div className="w-12 h-12 rounded-xl bg-[#FFE8E6] flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>

      {/* TITLE */}
      <h3 className="text-lg sm:text-xl font-bold text-black mb-3">{title}</h3>

      {/* DESCRIPTION */}
      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
