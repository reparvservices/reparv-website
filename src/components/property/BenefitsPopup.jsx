import { FaShieldAlt, FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const benefits = [
  {
    title: "Trusted Investment Guidance",
    description:
      "We prioritize your needs and budget to help you invest wisely — no hidden agendas, just honest support.",
  },
  {
    title: "Expert Partner Network",
    description:
      "Our trained Sales, Territory, Onboarding, and Project Partners offer personalized service, ensuring a smooth buying experience.",
  },
  {
    title: "End-to-End Assistance",
    description:
      "From property visits to home loans and registration, we handle it all—so you can relax and focus on your dream home.",
  },
  {
    title: "Verified Properties Only",
    description:
      "Every listing on Reparv is thoroughly verified for legal clarity, RERA compliance, and construction quality.",
  },
  {
    title: "Transparent Process",
    description:
      "No confusing jargon or last-minute surprises—we keep you informed at every step with clear documentation.",
  },
];

export default function BenefitsPopup({ onClose }) {
  return (
    <div className="bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-2xl p-6 w-full max-w-3xl relative shadow-xl">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <IoMdClose className="w-6 h-6" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FaShieldAlt className="text-green-600 w-5 h-5" />
        <h2 className="text-xl font-semibold">Why buy from REPARV?</h2>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2 items-start">
            <FaStar className="text-yellow-500 w-8 h-8" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {benefit.title}
              </h3>
              <p className="text-[#00000066] font-medium text-sm">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
