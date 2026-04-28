import { useEffect, useRef, useState } from "react";

const MAX_HEIGHT = 250;

const PropertyDescription = ({ propertyInfo }) => {
  const [readMore, setReadMore] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Wait for DOM + font rendering
    setTimeout(() => {
      const el = contentRef.current;
      setIsOverflowing(el.scrollHeight > MAX_HEIGHT);
    }, 0);
  }, [propertyInfo?.propertyDescription]);

  if (!propertyInfo?.propertyDescription) return null;

  return (
    <div className="w-full max-w-[876px] bg-white rounded-xl p-4 sm:p-6 mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        About This Property
      </h2>

      {/* Content */}
      <div className="relative">
        <div
          ref={contentRef}
          style={{ maxHeight: readMore ? "none" : MAX_HEIGHT }}
          className="text-sm sm:text-base text-black overflow-hidden transition-all duration-300"
        >
          {propertyInfo.propertyDescription}
        </div>

        {/* Fade overlay */}
        {!readMore && isOverflowing && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      {/* Read More / Less */}
      {isOverflowing && (
        <button
          onClick={() => setReadMore(!readMore)}
          className="mt-4 text-sm sm:text-base text-[#8A38F5] font-semibold hover:underline"
        >
          {readMore ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default PropertyDescription;