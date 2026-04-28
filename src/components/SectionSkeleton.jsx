import React from "react";

const SectionSkeleton = ({ height = "300px" }) => {
  return (
    <div className="w-full px-4 py-10 animate-pulse">
      <div
        className="w-full rounded-xl bg-gray-200"
        style={{ height }}
      />
      <div className="mt-4 space-y-3">
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default SectionSkeleton;