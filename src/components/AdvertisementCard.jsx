import React, { useEffect, useRef } from "react";

export default function AdvertisementCard({ variant = "main" }) {
  const isSidebar = variant === "sidebar";
  const adRef = useRef(null);

  useEffect(() => {
    if (!window.adsbygoogle || !adRef.current) return;

    try {
      window.adsbygoogle.push({});
    } catch (e) {
      console.warn("Adsense error:", e);
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center mx-auto z-0! 
        ${
          isSidebar
            ? "w-full max-w-[431px] min-h-[250px] md:min-h-[600px] rounded-[16px] px-4 py-4 mb-5"
            : "w-full min-h-[200px] md:min-h-[250px] rounded-[16px] px-6 py-5 mb-8"
        }
      `}
    >
      <span className="text-xs text-gray-400 mb-3">Advertisement</span>

      <ins
        ref={adRef}
        className="adsbygoogle w-full flex items-center justify-center p-4"
        data-ad-client="ca-pub-8914733371473026"
        data-ad-slot={isSidebar ? "9390920495" : "7275893049"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}