"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const JoinOurTeamDropdown = ({ textColour }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Join Our Team");

  const handleSelect = (value) => {
    setIsOpen(false);
    switch (value) {
      case "Sales Partner":
        //window.open("https://reparv.com/", "_blank");
        router.push("/sales-partner");
        setSelected("Sales Partner");
        break;
      case "Territory Partner":
        router.push("/territory-partner");
        setSelected("Territory Partner");
        break;
      case "Project Partner":
        router.push("/project-partner");
        setSelected("Project Partner");
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${textColour && "text-white"} ${
          (selected !== "Join Our Team" &&
            pathname === "/sales-partner") ||
          (selected !== "Join Our Team" &&
            pathname === "/territory-partner") ||
          (selected !== "Join Our Team" &&
            pathname === "/project-partner")
            ? "text-[#0BB501]"
            : "text-gray-800"
        } flex gap-1 items-center justify-center font-medium hover:text-[#8A38F5] hover:font-semibold focus:outline-none`}
      >
        {selected} <IoMdArrowDropdown className="w-6 h-6 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute left-[-30px] md:left-[-20px] font-semibold font-sans tracking-wide z-10 mt-2 w-30 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className=" text-[10px] md:text-sm text-gray-700">
            <li
              className="px-2 md:px-4 py-3 hover:bg-gray-100 hover:text-[#8A38F5] cursor-pointer"
              onClick={() => handleSelect("Sales Partner")}
            >
              Sales Partner
            </li>
            <li
              className="px-2 md:px-4 py-3 hover:bg-gray-100 hover:text-[#8A38F5] cursor-pointer"
              onClick={() => handleSelect("Project Partner")}
            >
              Project Partner
            </li>
            <li
              className="px-2 md:px-4 py-3 hover:bg-gray-100 hover:text-[#0BB501] cursor-pointer"
              onClick={() => handleSelect("Territory Partner")}
            >
              Territory Partner
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default JoinOurTeamDropdown;
