import React, { memo, useMemo } from "react";
import { MdDirections, MdLocationOn } from "react-icons/md";

const ADDRESS =
  "In front of Shiv Mandir, Sister Colony, Ram Nagar, Chandrapur, Maharashtra 442401";

const GetDirectionsMap = memo(() => {
  const embedUrl = useMemo(() => {
    return `https://www.google.com/maps?q=${encodeURIComponent(
      ADDRESS
    )}&output=embed`;
  }, []);

  const directionsUrl = useMemo(() => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      ADDRESS
    )}`;
  }, []);

  return (
    <section className="w-full">
      <div className="max-w-[1440px] mx-auto bg-white">

        {/* Map */}
        <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden bg-gray-100">
          <iframe
            src={embedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Directions Map"
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </section>
  );
});

export default GetDirectionsMap;