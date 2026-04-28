import React from "react";
import { TbArrowRightDashed } from "react-icons/tb";
import NewFlatIcon from "../assets/home/propertyType/NewFlat.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { usePropertyFilter } from "../store/propertyFilter";

function NavCard({ cardData }) {
  const navigate = useNavigate();
  const { setPropertyType } = useAuth();
  const { setSelectedType } = usePropertyFilter();
  return (
    <div
      onClick={() => {
        setPropertyType(cardData?.type || "NewFlat");
        setSelectedType(cardData?.type || "NewFlat");
        navigate(cardData?.to || "/properties");
      }}
      className="NavCard relative w-full min-w-[160px] flex flex-col gap-2 justify-between md:gap-4 p-4 md:p-6 lg:p-8 bg-white rounded-lg sm:rounded-2xl shadow-[0px_2px_6px_0px_#00000014] md:shadow-[0_3px_11px_3px_#2E154C26] hover:scale-103 duration-500 transition-all cursor-pointer"
    >
      {/* Title Section */}
      <div className="flex gap-2 justify-between ">
        <span className="w-[75%] text-[#3F2D62] font-semibold text-sm md:text-base lg:text-xl xl:text-2xl">
          {cardData?.title || "New Flat"}
        </span>
        <div className="w-6 h-6 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-[#F2EBFF]">
          <TbArrowRightDashed className="lg:w-6 lg:h-6" />
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full flex items-center justify-center overflow-hidden">
        <img
          src={cardData?.image || NewFlatIcon}
          alt={cardData?.title}
          className="w-[100%] object-cover"
        />
      </div>

      {/* Right Dot Section */}
      <div className="absolute right-0 top-1/2 w-[8px] sm:w-[15px] h-[32px] sm:h-[60px] rounded-tl-[6px] rounded-bl-[6px] bg-[#5E23DC] "></div>
    </div>
  );
}

export default NavCard;
