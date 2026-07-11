"use client";

import React, { useEffect, useRef, useState } from "react";
import { initAdSenseSlot, watchAdFill } from "../utils/initAdSense";

const AD_CLIENT = "ca-pub-7197621532263972";
const AD_SLOT_MAIN = "8862712271";
const AD_SLOT_SIDEBAR = "2760338353";
const AD_SLOT_SEO_DISPLAY = "8298394047";
const AD_SLOT_SEO_INFEED = "3673964774";
const SEO_INFEED_LAYOUT_KEY = "-6t+ed+2i-1n-4w";
const IS_DEV = process.env.NODE_ENV === "development";

const VARIANT_STYLES = {
  sidebar: "w-full max-w-[431px] rounded-[12px] px-3 py-3 mb-5",
  seoInFeed: "w-full rounded-[12px] px-2 py-2 mb-6",
  seoDisplay: "w-full rounded-[12px] px-4 py-3 mb-6",
  main: "w-full rounded-[12px] px-3 sm:px-4 py-2.5 mb-4 sm:mb-5",
};

export default function AdvertisementCard({
  variant = "main",
  className = "",
  onEmpty,
}) {
  const isSidebar = variant === "sidebar";
  const isSeoDisplay = variant === "seoDisplay";
  const isSeoInFeed = variant === "seoInFeed";
  const adRef = useRef(null);
  const initialized = useRef(false);
  const [visible, setVisible] = useState(true);
  const [filled, setFilled] = useState(false);
  const [showDevPlaceholder, setShowDevPlaceholder] = useState(false);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad || initialized.current) return;

    initialized.current = true;
    initAdSenseSlot();

    return watchAdFill(ad, {
      onFilled: () => setFilled(true),
      onEmpty: () => {
        if (IS_DEV) {
          setShowDevPlaceholder(true);
          return;
        }
        setVisible(false);
        onEmpty?.();
      },
    });
  }, [onEmpty]);

  const wrapperStyle =
    variant === "main"
      ? VARIANT_STYLES.main
      : isSidebar
        ? VARIANT_STYLES.sidebar
        : isSeoInFeed
          ? VARIANT_STYLES.seoInFeed
          : isSeoDisplay
            ? VARIANT_STYLES.seoDisplay
            : VARIANT_STYLES.main;

  const adFormat =
    isSidebar || isSeoDisplay || variant === "main"
      ? "auto"
      : isSeoInFeed
        ? "fluid"
        : "auto";

  if (!visible) return null;

  if (showDevPlaceholder) {
    return (
      <div
        className={`flex flex-col items-stretch mx-auto z-0 ${wrapperStyle} border border-dashed border-gray-300 bg-gray-50 ${className}`}
      >
        <span className="text-[10px] uppercase tracking-wide text-gray-400 mb-1.5 text-center">
          Advertisement
        </span>
        <div className="min-h-[90px] flex items-center justify-center text-xs text-gray-400 px-4 text-center">
          Ad slot active on production (AdSense does not serve on localhost)
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-stretch mx-auto z-0 w-full ${
        filled
          ? `${wrapperStyle} border border-[#E8E8E8] bg-white shadow-sm ${className}`
          : className
      }`}
    >
      {filled && (
        <span className="text-[10px] uppercase tracking-wide text-gray-400 mb-1.5 text-center">
          Advertisement
        </span>
      )}

      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
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
        data-ad-format={adFormat}
        {...(isSeoInFeed ? { "data-ad-layout-key": SEO_INFEED_LAYOUT_KEY } : {})}
        {...(isSidebar || isSeoDisplay || variant === "main"
          ? { "data-full-width-responsive": "true" }
          : {})}
      />
    </div>
  );
}
