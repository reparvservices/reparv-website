import React from "react";

function PropertyTab({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="w-full h-[40px] sm:h-[50px] flex gap-6 items-center justify-around border-b border-b-[#D9D9D9] px-6 overflow-scroll scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`h-full px-2 text-sm sm:text-base whitespace-nowrap transition-all duration-200 ${
            activeTab === tab
              ? "text-[#8A38F5] font-bold border-b-2 border-[#8A38F5]"
              : "text-[#868686] font-medium hover:text-[#8A38F5]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default PropertyTab;
