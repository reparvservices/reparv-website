import React from "react";

export default function PropertySkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-[200px] bg-gray-200"></div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>

        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-4"></div>
      </div>
    </div>
  );
}