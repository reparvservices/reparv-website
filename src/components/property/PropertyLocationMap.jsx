import React, { memo, useMemo } from "react";
import { MdLocationOn } from "react-icons/md";

/**
 * Build Google Maps embed URL from property fields
 */
const buildMapEmbedUrl = ({ address, location, city, state, pincode }) => {
  const parts = [address, location, city, state, pincode].filter(Boolean);

  if (parts.length === 0) return null;

  return `https://www.google.com/maps?q=${encodeURIComponent(
    parts.join(", ")
  )}&output=embed`;
};

const PropertyLocationMap = memo(({ property }) => {
  const {
    address = "",
    location = "",
    city = "",
    state = "",
    pincode = "",
  } = property || {};

  const fullAddress = [address, location, city, state, pincode]
    .filter(Boolean)
    .join(", ");

  const embedUrl = useMemo(
    () =>
      buildMapEmbedUrl({
        address,
        location,
        city,
        state,
        pincode,
      }),
    [address, location, city, state, pincode]
  );

  return (
    <section className="bg-white rounded-xl p-4 sm:p-6">
      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Location</h2>

      {/* Address */}
      <div className="flex items-start gap-3 mb-5">
        <MdLocationOn className="text-[#8A38F5] text-2xl mt-1" />
        <div>
          <p className="font-medium text-black">
            {address || location || city || "Address not specified"}
          </p>

          {fullAddress && (
            <p className="text-gray-500 text-sm mt-1">{fullAddress}</p>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full h-[300px] sm:h-[350px] rounded-xl overflow-hidden bg-gray-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Property Location Map"
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Map location not available
          </div>
        )}
      </div>
    </section>
  );
});

export default PropertyLocationMap;