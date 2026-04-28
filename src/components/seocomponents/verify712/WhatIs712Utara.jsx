import docIcon from "../../../assets/seopageassets/verify712/list.svg";
import starIcon from "../../../assets/seopageassets/verify712/star.svg";

// LIST ICONS (you provide these)
import purpleCheckIcon from "../../../assets/seopageassets/verify712/purple-check.svg";
import blueCheckIcon from "../../../assets/seopageassets/verify712/blue-check.svg";

export default function WhatIs712Utara() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-5xl font-bold text-[#3F2D62]">
            What is 7/12 Utara?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Understanding the most important land document in Maharashtra
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* WHAT IT IS */}
          <InfoCard
            icon={docIcon}
            title="What It Is?"
            bg="#FBF8FF"
            border="#8A38F5"
            listIcon={purpleCheckIcon}
            description="7/12 Utara (सातबारा उतारा) is an extract from the land register maintained by the revenue department of Maharashtra. It contains crucial details about agricultural land."
            items={[
              "Owner’s name and details",
              "Survey number and area",
              "Cultivation details",
              "Land classification",
            ]}
          />

          {/* WHY IMPORTANT */}
          <InfoCard
            icon={starIcon}
            title="Why It’s Important?"
            bg="#F0F9FF"
            border="#4693B9"
            listIcon={blueCheckIcon}
            description="This document is essential for various legal and financial transactions involving land."
            items={[
              "Property purchase verification",
              "Bank loan applications",
              "Legal disputes resolution",
              "Government schemes eligibility",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ===============================
   REUSABLE CARD
   =============================== */

function InfoCard({ icon, title, items, bg, border, description, listIcon }) {
  return (
    <div
      className="rounded-2xl p-6 sm:p-8 h-full"
      style={{
        backgroundColor: bg,
        border: `1.5px solid ${border}`,
      }}
    >
      {/* ICON */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ backgroundColor: border }}
      >
        <img src={icon} alt={title} className="w-5 h-5" />
      </div>

      {/* TITLE */}
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-3">{title}</h3>

      {/* DESCRIPTION */}
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
      )}

      {/* LIST */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <img src={listIcon} alt="" className="w-4 h-4 mt-1 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
