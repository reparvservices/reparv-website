import whatIsRera from "../../../assets/seopageassets/reparvproperties/book-bold.svg";
import whyRera from "../../../assets/seopageassets/reparvproperties/idea.svg";
import reraProtection from "../../../assets/seopageassets/reparvproperties/protection.svg";

export default function RERAInfoCards() {
  return (
    <section className="bg-[#F9F4FF] py-12 sm:py-16">
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <InfoCard
            icon={whatIsRera}
            title="What is RERA?"
            description="The Real Estate (Regulation and Development) Act, 2016 is a comprehensive law that regulates the real estate sector in India. It aims to protect homebuyers and boost investments in the sector."
          />

          <InfoCard
            icon={whyRera}
            title="Why RERA Was Introduced?"
            description="RERA was introduced to bring transparency and accountability in the real estate sector, protect consumer interests, and establish a regulatory mechanism for timely project completion."
          />

          <InfoCard
            icon={reraProtection}
            title="How RERA Protects Buyers?"
            description="RERA mandates project registration, ensures transparent disclosure of project details, protects buyer payments in escrow accounts, and provides a fast-track dispute resolution mechanism."
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================
   REUSABLE CARD
   =============================== */

function InfoCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_#8A38F529] h-full">
      {/* SVG ICON */}
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#EFE7FF] mb-6">
        <img src={icon} alt={title} className="w-6 h-6 object-contain" />
      </div>

      {/* TITLE */}
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">{title}</h3>

      {/* DESCRIPTION */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
