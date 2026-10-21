"use client"

import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiShare2, FiTrash2 } from "react-icons/fi";
import { TiLocationOutline } from "react-icons/ti";
import { BiArea } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { RiBuildingLine } from "react-icons/ri";
import { getImageURI } from "../../utils/helper";
import ListingBadges from "./ListingBadges";
import { categoryLabel, listingStatusFor } from "../../utils/propertyListing";

export default function ListingCard({ property, delProperty }) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const statusStyle = {
    Live: "bg-green-50 text-green-700 border-green-200",
    "Under Review": "bg-orange-50 text-orange-700 border-orange-200",
    Rejected: "bg-red-50 text-red-600 border-red-200",
    Inactive: "bg-gray-100 text-gray-600 border-gray-200",
  };
  const status = listingStatusFor(property);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#D9D9D9] flex gap-5 relative">
      {/* Image */}
      <img
        src={(() => {
          try {
            const images = JSON.parse(property?.frontView || "[]");
            return images.length > 0
              ? `${getImageURI(images[0])}`
              : "/assets/property/propertyPicture.svg";
          } catch {
            return "/assets/property/propertyPicture.svg";
          }
        })()}
        alt={property?.seoSlug || property?.propertyName}
        onError={(e) => {
          e.currentTarget.src = "/assets/property/propertyPicture.svg";
        }}
        className="w-40 h-28 shrink-0 object-cover rounded-lg bg-gray-100"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base truncate">{property?.propertyName}</h3>

        <p className="flex items-center gap-1 text-sm text-[#868686] mt-1">
          <TiLocationOutline className="w-5 h-5 shrink-0" />
          <span className="truncate">{property?.address}</span>
        </p>
        <ListingBadges property={property} className="mt-2" />

        <div className="flex gap-4 text-sm text-[#868686] mt-3">
          <div className="flex items-center gap-2">
            <RiBuildingLine /> {categoryLabel(property?.propertyCategory)}
          </div>
          {property?.carpetArea ? (
            <span className="flex items-center gap-2">
              <BiArea /> {property.carpetArea} sq.ft
            </span>
          ) : null}
        </div>

        <div className="flex gap-6 text-xs mt-3">
          <span className="flex items-center gap-1 text-gray-600" title="Views">
            <AiOutlineEye className="text-[#2196F3]" /> {property?.views || "0"} views
          </span>
          <span className="flex items-center gap-1 text-gray-600" title="Shares">
            <FiShare2 className="text-[#04972B]" /> {property?.share || "0"} shares
          </span>
          <span className="flex items-center gap-1 text-gray-600" title="Saved by users">
            <FaHeart className="text-[#FF9800]" /> {property?.likes || "0"} saved
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end justify-between gap-3 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              window.open(`/edit-property/${property?.propertyid}`, "_blank");
            }}
            className="flex items-center gap-2 bg-[#5323DC] text-white px-4 py-2 rounded-lg text-sm"
          >
            <FiEdit2 /> Edit Property
          </button>

          {/* 3 Dot Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu(!openMenu)}
              aria-label="More actions"
              className="p-1.5 rounded-md hover:bg-gray-100"
            >
              <FiMoreVertical className="text-xl" />
            </button>

            {openMenu && (
              <div className="absolute right-0 top-8 w-36 bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={() => {
                    window.open(
                      "/property-info/" + property?.seoSlug,
                      "_blank"
                    );
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <AiOutlineEye /> View
                </button>

                <button
                  onClick={() => {
                    delProperty(property?.propertyid);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <span
          title={
            status === "Under Review"
              ? "Our team is verifying this listing. It will be visible to buyers once approved."
              : undefined
          }
          className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
