import verifyIcon from "../../../assets/seopageassets/turstedbuilder/verification.svg";
import legalIcon from "../../../assets/seopageassets/turstedbuilder/complience.svg";
import docsIcon from "../../../assets/seopageassets/turstedbuilder/documentation.svg";
import monitorIcon from "../../../assets/seopageassets/turstedbuilder/monitoring.svg";
import reviewIcon from "../../../assets/seopageassets/turstedbuilder/review.svg";
import protectIcon from "../../../assets/seopageassets/turstedbuilder/protection.svg";

import qualityIcon from "../../../assets/seopageassets/turstedbuilder/quality.svg";
import expertIcon from "../../../assets/seopageassets/turstedbuilder/support.svg";
import secureIcon from "../../../assets/seopageassets/turstedbuilder/transaction.svg";

export default function BuilderTrustFlow() {
  return (
    <section className="bg-white py-7 sm:py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-20">
        {/* ================= WHY TRUST OUR BUILDERS ================= */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Why Trust Our Builders
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3 max-w-3xl mx-auto">
            Every builder on Reprva undergoes a comprehensive verification
            process to ensure your investment is safe
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <TrustCard
              icon={verifyIcon}
              title="Rigorous Verification"
              text="Multi-level verification including background checks, financial stability, and project track record"
            />
            <TrustCard
              icon={legalIcon}
              title="Legal Compliance"
              text="All builders are verified for RERA registration, tax compliance, and legal documentation"
            />
            <TrustCard
              icon={docsIcon}
              title="Transparent Documentation"
              text="Complete access to builder credentials, past projects, customer reviews, and legal documents"
            />
            <TrustCard
              icon={monitorIcon}
              title="Ongoing Monitoring"
              text="Continuous tracking of builder performance, project delivery timelines, and customer satisfaction"
            />
            <TrustCard
              icon={reviewIcon}
              title="Customer Reviews"
              text="Authentic reviews from verified buyers to help you make informed decisions"
            />
            <TrustCard
              icon={protectIcon}
              title="Buyer Protection"
              text="Dedicated support team and dispute resolution mechanism to safeguard your interests"
            />
          </div>
        </div>

        {/* ================= HOW IT WORKS ================= */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-3">
            Your journey to finding a trusted builder in 5 simple steps
          </p>

          {/* DESKTOP FLOW */}
          <div className="hidden lg:block mt-14">
            <div className="relative flex justify-between items-start">
              {/* LINE */}
              <div className="absolute top-6 left-0 right-0 h-[2px] bg-[#8A38F5]/30" />

              {steps.map((step, i) => (
                <div key={i} className="relative z-10 w-1/5 text-center px-3">
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#8A38F5] text-white flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                  <h4 className="font-semibold mt-5">{step.title}</h4>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE FLOW */}
          <div className="lg:hidden mt-10 space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#8A38F5] text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h4 className="font-semibold mt-3">{step.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BUILT ON TRUST ================= */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Built on Trust & Transparency
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-4 max-w-3xl mx-auto leading-relaxed">
            At Reprva, we believe that buying property should be a confident and
            transparent experience. Our platform connects you with builders who
            have proven their credibility through rigorous verification, giving
            you the peace of mind you deserve when making one of life's biggest
            investments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <BottomCard
              icon={qualityIcon}
              title="Verified Quality"
              text="Every builder meets our stringent quality standards and industry best practices"
            />
            <BottomCard
              icon={expertIcon}
              title="Expert Support"
              text="Dedicated relationship managers to guide you through every step of your journey"
            />
            <BottomCard
              icon={secureIcon}
              title="Secure Transactions"
              text="Protected communication channels and secure documentation process"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= SUB COMPONENTS ================= */

const steps = [
  {
    title: "Search Builders",
    text: "Browse verified builders in your preferred city and budget range",
  },
  {
    title: "Review Profiles",
    text: "Check credentials, past projects, and customer testimonials",
  },
  {
    title: "Submit Enquiry",
    text: "Connect directly with shortlisted builders through our platform",
  },
  {
    title: "Site Visits",
    text: "Schedule visits and evaluate projects with expert guidance",
  },
  {
    title: "Make Decision",
    text: "Choose confidently with complete transparency and support",
  },
];

function TrustCard({ icon, title, text }) {
  return (
    <div className="bg-[#F9F7FF] rounded-2xl p-6 text-left">
      <div className="w-11 h-11 rounded-lg bg-[#E3CEFF] flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

function BottomCard({ icon, title, text }) {
  return (
    <div className="bg-[#F9F7FF] rounded-2xl p-6 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-white shadow flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}
