import Link from "next/link";
import React from "react";
import HomePropertiesOnRentSection from "../../assets/home/HomePropertiesOnRentCard.svg";
const PropertyOnRentSection = () => {
  return (
    <Link href={"/rental-property"} className="flex flex-col items-center p-4 md:p-8 gap-6 md:pb-15">
      <img
        src={HomePropertiesOnRentSection}
        alt="Get Property In Three Steps"
        loading="lazy"
        className="w-full max-w-[1380px] hover:scale-102 duration-500 transition-all cursor-pointer"
      />
    </Link>
  );
};

export default PropertyOnRentSection;
