
export default function UtaraVsPropertyCard() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-5xl font-bold text-[#3F2D62]">
            7/12 Utara vs Property Card
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Understanding the key differences
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <UsageCard
            icon="/assets/seopageassets/verify712/list.svg"
            title="When 7/12 is Used?"
            bg="#FBF8FF"
            border="#4F8BFF"
            listIcon="/assets/seopageassets/verify712/purple-check.svg"
            items={[
              "Agricultural land in rural areas",
              "Land outside municipal corporation limits",
              "Cultivation and crop details required",
              "Agricultural loan applications",
            ]}
          />

          <UsageCard
            icon="/assets/seopageassets/verify712/star.svg"
            title="When Property Card is Used?"
            bg="#F0F9FF"
            border="#4693B9"
            listIcon="/assets/seopageassets/verify712/blue-check.svg"
            items={[
              "Urban properties and buildings",
              "Land within municipal corporation",
              "Property tax assessment",
              "Home loan applications",
            ]}
          />
        </div>

        {/* COMPARISON TABLE (DESKTOP) */}
        <div className="hidden sm:block bg-[#F5F5F7] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#ECECEF]">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Parameter</th>
                <th className="text-left px-6 py-4 font-semibold">
                  7/12 Utara
                </th>
                <th className="text-left px-6 py-4 font-semibold">
                  Property Card
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#F3F3F6]"}
                >
                  <td className="px-6 py-4 font-medium">{row.label}</td>
                  <td className="px-6 py-4">{row.utara}</td>
                  <td className="px-6 py-4">{row.property}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* COMPARISON (MOBILE STACK) */}
        <div className="sm:hidden space-y-4">
          {TABLE_ROWS.map((row) => (
            <div key={row.label} className="bg-[#F5F5F7] rounded-xl p-4">
              <p className="font-semibold mb-2">{row.label}</p>
              <p className="text-sm text-gray-700">
                <strong>7/12 Utara:</strong> {row.utara}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Property Card:</strong> {row.property}
              </p>
            </div>
          ))}
        </div>

        {/* IMPORTANT NOTE */}
        <div className="mt-10 bg-[#FFF7E0] border-l-4 border-[#FFC107] p-4 rounded-md flex gap-3">
          <img src="/assets/seopageassets/verify712/info.svg" alt="info" className="w-4 h-4 mt-1" />
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong>Important Note:</strong> If land has been converted from
            agricultural to non-agricultural (NA conversion), you may need both
            documents. Always verify which document is applicable for your
            specific property type and location with local authorities or legal
            experts.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ===============================
   USAGE CARD
   =============================== */

function UsageCard({ icon, title, items, bg, border, listIcon }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8 h-full"
      style={{ backgroundColor: bg, border: `2px solid ${border}` }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: border }}
      >
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <img src={listIcon} alt="" className="w-4 h-4 mt-1" />
            <span className="text-sm sm:text-base text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===============================
   TABLE DATA
   =============================== */

const TABLE_ROWS = [
  {
    label: "Land Type",
    utara: "Agricultural / Rural",
    property: "Non-agricultural / Urban",
  },
  {
    label: "Area",
    utara: "Outside municipal limits",
    property: "Within municipal limits",
  },
  {
    label: "Usage",
    utara: "Farming, land ownership",
    property: "Residential / Commercial",
  },
  {
    label: "Issuing Authority",
    utara: "Talathi / Revenue Department",
    property: "Municipal Corporation",
  },
  {
    label: "Cultivation Data",
    utara: "Yes, includes crop details",
    property: "No cultivation data",
  },
  {
    label: "Loan Usage",
    utara: "Agricultural loans",
    property: "Home / Property loans",
  },
];
