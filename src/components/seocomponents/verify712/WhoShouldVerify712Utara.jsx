import buyerIcon from "../../../assets/seopageassets/verify712/land-buyer.svg";
import farmerIcon from "../../../assets/seopageassets/verify712/farmers.svg";
import investorIcon from "../../../assets/seopageassets/verify712/investors.svg";
import builderIcon from "../../../assets/seopageassets/verify712/builders.svg";
import loanIcon from "../../../assets/seopageassets/verify712/loan-application.svg";
import legalIcon from "../../../assets/seopageassets/verify712/legal-cunsultants.svg";

import extractIcon from "../../../assets/seopageassets/verify712/file.svg";
import mutationIcon from "../../../assets/seopageassets/verify712/file.svg";
import saleIcon from "../../../assets/seopageassets/verify712/sale-deed.svg";
import naIcon from "../../../assets/seopageassets/verify712/na-order.svg";
import propertyIcon from "../../../assets/seopageassets/verify712/property-card.svg";
import authorityIcon from "../../../assets/seopageassets/verify712/authority-approval.svg";

export default function WhoShouldVerify712Utara() {
  const stakeholders = [
    {
      title: "Land Buyers",
      desc: "Verify ownership, encumbrances, and legal status before purchasing agricultural or non-agricultural land",
      icon: buyerIcon,
      bg: "bg-[#F3EDFF]",
    },
    {
      title: "Farmers",
      desc: "Check cultivation rights, land records, and eligibility for government schemes and subsidies",
      icon: farmerIcon,
      bg: "bg-[#E8FFE9]",
    },
    {
      title: "Investors",
      desc: "Validate land authenticity, ownership history, and potential legal issues before investment",
      icon: investorIcon,
      bg: "bg-[#EAF4FF]",
    },
    {
      title: "Builders",
      desc: "Confirm land ownership and legal clearances before starting construction projects",
      icon: builderIcon,
      bg: "bg-[#FFF1E6]",
    },
    {
      title: "Loan Applicants",
      desc: "Banks require verified 7/12 extract for processing agricultural and land loans",
      icon: loanIcon,
      bg: "bg-[#FFF6DD]",
    },
    {
      title: "Legal Consultants",
      desc: "Perform due diligence and verify land records for property transaction advisory",
      icon: legalIcon,
      bg: "bg-[#F4EDFF]",
    },
  ];

  const documents = [
    {
      title: "8A Extract",
      subtitle: "Land ownership record",
      icon: extractIcon,
    },
    {
      title: "Mutation Register",
      subtitle: "Ownership transfer record",
      icon: mutationIcon,
    },
    {
      title: "Sale Deed",
      subtitle: "Legal sale document",
      icon: saleIcon,
    },
    {
      title: "NA Order",
      subtitle: "Non-agricultural conversion",
      icon: naIcon,
    },
    {
      title: "Property Card",
      subtitle: "Urban property record",
      icon: propertyIcon,
    },
    {
      title: "Authority Approvals",
      subtitle: "Local body clearances",
      icon: authorityIcon,
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Who Should Verify 7/12 Utara?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Essential verification for various stakeholders
          </p>
        </div>

        {/* ================= STAKEHOLDERS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stakeholders.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_#8A38F529] text-center"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <img src={item.icon} alt={item.title} className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-bold mt-5">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= DOCUMENTS HEADER ================= */}
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Related Documents to Verify
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Complete property verification checklist
          </p>
        </div>

        {/* ================= DOCUMENTS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.title}
              className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-[0_10px_30px_#8A38F529]"
            >
              <div className="w-12 h-12 rounded-lg bg-[#EFE7FF] flex items-center justify-center">
                <img src={doc.icon} alt={doc.title} className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-semibold">{doc.title}</h4>
                <p className="text-xs text-gray-500">{doc.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
