import React, { useEffect, useRef } from "react";

const AD_CLIENT = "ca-pub-7197621532263972";
const AD_SLOT_MAIN = "8862712271";
const AD_SLOT_SIDEBAR = "2760338353";
const AD_SLOT_SEO_DISPLAY = "8298394047";
const AD_SLOT_SEO_INFEED = "3673964774";
const SEO_INFEED_LAYOUT_KEY = "-6t+ed+2i-1n-4w";

export default function AdvertisementCard({ variant = "main" }) {
  const isSidebar = variant === "sidebar";
  const isSeoDisplay = variant === "seoDisplay";
  const isSeoInFeed = variant === "seoInFeed";
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
            : isSeoInFeed
              ? "w-full min-h-[140px] rounded-[16px] px-2 py-2 mb-8"
            : "w-full min-h-[200px] md:min-h-[250px] rounded-[16px] px-6 py-5 mb-8"
        }
      `}
    >
      <span className="text-xs text-gray-400 mb-3">Advertisement</span>

      <ins
        ref={adRef}
        className="adsbygoogle w-full"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={
          isSidebar
            ? AD_SLOT_SIDEBAR
            : isSeoDisplay
              ? AD_SLOT_SEO_DISPLAY
              : isSeoInFeed
                ? AD_SLOT_SEO_INFEED
                : AD_SLOT_MAIN
        }
        data-ad-format={
          isSidebar || isSeoDisplay
            ? "auto"
            : isSeoInFeed
              ? "fluid"
              : "autorelaxed"
        }
        {...(isSeoInFeed ? { "data-ad-layout-key": SEO_INFEED_LAYOUT_KEY } : {})}
        {...(isSidebar || isSeoDisplay ? { "data-full-width-responsive": "true" } : {})}
      />
    </div>
  );
}