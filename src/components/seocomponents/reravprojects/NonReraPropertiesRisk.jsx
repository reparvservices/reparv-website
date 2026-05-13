
export default function NonRERARisks() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3D2A5D]">
            Risks of Buying a Non-RERA Registered Property
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Understand the dangers before making a decision
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <RiskCard
            icon="/assets/seopageassets/reparvproperties/stop.svg"
            title="No Legal Protection"
            description="Without RERA registration, you have limited legal recourse if the builder fails to deliver. Your investment remains unprotected and vulnerable to fraud."
          />

          <RiskCard
            icon="/assets/seopageassets/reparvproperties/clock-filled.svg"  
            title="High Risk of Project Delays"
            description="Non-registered projects have no accountability for timelines. Delays can extend indefinitely with no compensation or recourse available to buyers."
          />

          <RiskCard
            icon="/assets/seopageassets/reparvproperties/view-off.svg"
            title="Absence of Regulatory Oversight"
            description="Without regulatory oversight, builders can make false promises, alter plans, or compromise on quality without facing consequences or penalties."
          />

          <RiskCard
            icon="/assets/seopageassets/reparvproperties/money.svg"
            title="Potential Financial Loss"
            description="Your entire investment is at risk. Non-RERA projects can be abandoned mid-way, leaving you with neither property nor refund options."
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================
   RISK CARD
   =============================== */

function RiskCard({ icon, title, description }) {
  return (
    <div className="bg-[#FFF4F4] border border-[#FF4D4F] rounded-2xl p-6 sm:p-8">
      {/* ICON */}
      <div className="w-12 h-12 rounded-xl bg-[#FF3B30] flex items-center justify-center mb-5">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>

      {/* TITLE */}
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-black">{title}</h3>

      {/* DESCRIPTION */}
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
