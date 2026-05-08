import { useRouter } from "next/navigation";
import React from "react";
import { IoSearchSharp } from "react-icons/io5";
const HomeSearch = ({ propertySearch, setPropertySearch }) => {
  const router = useRouter();

  const handleFocus = () => {
    // Store a flag to tell the properties page to focus its search bar
    sessionStorage.setItem("focusPropertySearch", "true");
    // Redirect to /properties
    router.push("/properties");
  };

  return (
    <div className="w-full max-w-5xl hidden sm:block">
      <div className="relative">
        <span className="absolute inset-y-0 left-4 md:left-6 flex items-center text-gray-400">
          <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
        </span>
        <input
          type="text"
          value={propertySearch}
          onChange={(e) => setPropertySearch(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search For Your Favourite Property"
          className="w-full pl-10 md:pl-14 pr-6 py-3 text-xs md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 placeholder:text-[#00000066]"
        />
      </div>
    </div>
  );
};

export default HomeSearch;
