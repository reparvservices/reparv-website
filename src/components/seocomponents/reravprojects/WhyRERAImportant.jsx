import shieldOff from "../../../assets/seopageassets/reparvproperties/fake.svg";
import documentCheck from "../../../assets/seopageassets/reparvproperties/legal.svg";
import timeline from "../../../assets/seopageassets/reparvproperties/transprancy.svg";
import accountability from "../../../assets/seopageassets/reparvproperties/builder.svg";
import checkIcon from "../../../assets/seopageassets/reparvproperties/right.svg";

export default function WhyRERAImportant() {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3D2A5D]">
            Why RERA Verification is Important
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Protect your investment with official verification
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-14">
          <InfoCard
            icon={shieldOff}
            title="Avoid Fake Projects"
            description="Verify authenticity of projects and builders through official government records. Protect yourself from fraudulent schemes and unauthorized developments."
          />

          <InfoCard
            icon={documentCheck}
            title="Confirm Legal Compliance"
            description="Ensure the project meets all legal requirements and has obtained necessary approvals from relevant authorities before making any investment."
          />

          <InfoCard
            icon={timeline}
            title="Transparency in Timelines"
            description="Access verified project timelines and completion dates. Make informed decisions based on actual project status and developer track record."
          />

          <InfoCard
            icon={accountability}
            title="Builder Accountability"
            description="Hold builders accountable for commitments. RERA registration ensures builders follow regulations and maintain quality standards throughout construction."
          />
        </div>

        {/* PURPLE SECTION */}
        <div className="rounded-2xl bg-gradient-to-br from-[#5E23DC] to-[#8A38F5] p-6 sm:p-10 text-white">
          <h3 className="text-xl sm:text-3xl font-bold text-center">
            How Reparv Uses RERA Data
          </h3>
          <p className="text-center text-sm sm:text-base text-white/80 mt-3 mb-8">
            Our comprehensive verification process ensures your safety
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CheckItem
              icon={checkIcon}
              title="Verified Listings Only"
              text="Every property listed on Reparv is cross-verified with official RERA databases to ensure authenticity and legal compliance."
            />

            <CheckItem
              icon={checkIcon}
              title="Manual + System Checks"
              text="We combine automated verification systems with manual review by experts to ensure accuracy and catch discrepancies."
            />

            <CheckItem
              icon={checkIcon}
              title="Partner Validation"
              text="All builder partners undergo rigorous background checks and must maintain active RERA registration."
            />

            <CheckItem
              icon={checkIcon}
              title="Ongoing Project Tracking"
              text="We continuously monitor project status and RERA compliance, alerting you to any updates in real time."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================
   SMALL COMPONENTS
   =============================== */

function InfoCard({ icon, title, description }) {
  return (
    <div className="border border-[#E5E5E5] rounded-2xl p-6 sm:p-8 bg-white">
      <div className="w-12 h-12 rounded-lg bg-[#8A38F5] flex items-center justify-center mb-5">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>

      <h4 className="text-lg sm:text-xl font-bold mb-3">{title}</h4>
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function CheckItem({ icon, title, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
        <img src={icon} alt="check" className="w-4 h-4" />
      </div>

      <div>
        <h5 className="font-semibold text-sm sm:text-base">{title}</h5>
        <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}
