"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TiLocationOutline } from "react-icons/ti";
import { RiBuildingLine } from "react-icons/ri";
import { FiUsers, FiHome, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FormatPrice from "../components/FormatPrice";
import AdvertisementCard from "../components/AdvertisementCard";
import VenueBookingForm from "../components/venue/VenueBookingForm";

const FALLBACK_IMAGE = "/assets/property/propertyPicture.svg";

const SOCIALS = [
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "facebook", label: "Facebook", Icon: FaFacebook },
  { key: "x", label: "X", Icon: FaXTwitter },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "website", label: "Website", Icon: FaGlobe },
];

/** YouTube video id from watch / youtu.be / shorts / embed links, else null. */
function youtubeId(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") return u.pathname.slice(1) || null;
    if (host.endsWith("youtube.com")) {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(shorts|embed|live)\/([\w-]+)/);
      return m ? m[2] : null;
    }
  } catch {}
  return null;
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-black font-semibold text-sm text-right capitalize">{value}</span>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function BookingCard({ venue }) {
  const unit = venue.price_model === "night" ? "night" : "slot";
  const weekend = venue.weekend_price && Number(venue.weekend_price) > Number(venue.base_price);
  const tiles = [
    { Icon: FiUsers, label: `${venue.capacity} Guests` },
    { Icon: FiHome, label: venue.bedrooms ? `${venue.bedrooms} Bedrooms` : venue.type_label || venue.type },
    { Icon: RiBuildingLine, label: venue.type_label || venue.type },
  ];
  return (
    <div className="relative w-full max-w-[460px] bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 font-sans">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">{venue.title}</h2>
          <p className="text-xs font-bold text-violet-600 mt-0.5 capitalize">{venue.type_label || venue.type} in {venue.city}</p>
        </div>
        <div className="flex-shrink-0 bg-violet-50 border border-violet-100 rounded-xl px-2.5 py-1.5 text-[9px] font-bold text-slate-700 uppercase tracking-wide">
          Reparv Assured
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
        <TiLocationOutline size={16} />
        <span className="truncate capitalize">{[venue.address, venue.city, venue.state].filter(Boolean).join(", ")}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tiles.map(({ Icon, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl p-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Icon size={14} />
            </div>
            <span className="text-[9px] font-bold text-slate-600 text-center leading-tight capitalize">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-xl p-4">
        <div className="absolute -right-4 -top-6 w-28 h-28 bg-violet-100 rounded-full blur-2xl opacity-50 pointer-events-none" />
        <p className="text-[9px] font-extrabold text-violet-400 uppercase tracking-widest mb-1 relative">Starting from</p>
        <div className="flex items-end gap-1 relative">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-none">
            <FormatPrice price={venue.base_price} />
          </span>
          <span className="text-xs text-gray-500 font-semibold mb-0.5">/ {unit}</span>
        </div>
        {weekend ? (
          <p className="text-[11px] text-gray-500 mt-1 font-medium relative">
            Weekend <FormatPrice price={venue.weekend_price} /> / {unit}
          </p>
        ) : null}
        {venue.deposit_percent < 100 ? (
          <p className="mt-3 pt-2.5 border-t border-gray-200 text-[11px] font-bold text-violet-600 relative">
            Pay only {venue.deposit_percent}% now to confirm
          </p>
        ) : null}
      </div>

      <VenueBookingForm venue={venue} />
    </div>
  );
}

export default function VenueDetails({ venue }) {
  const images = venue.images?.length ? venue.images : [FALLBACK_IMAGE];
  const [active, setActive] = useState(0);
  const unit = venue.price_model === "night" ? "per night" : "per slot";

  return (
    <div className="w-full max-w-345 flex flex-col sm:p-4 mx-auto bg-[#f8f3fb]">
      <Link
        href="/venues"
        className="mx-4 sm:mx-6 mt-3 mb-1 inline-flex items-center gap-2 text-sm font-semibold text-[#8A38F5]"
      >
        <FiArrowLeft /> All venues
      </Link>

      <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6 lg:pt-4">
        <div className="leftSection w-full md:w-[50%] lg:w-[60%] xl:w-[65%] flex flex-col gap-2 sm:gap-4">
          <h1 className="mx-4 sm:mx-6 mt-2 sm:mt-0 text-lg sm:text-2xl font-bold">{venue.title}</h1>

          {/* Gallery */}
          <div className="mx-4 sm:mx-6 flex flex-col gap-3">
            <img
              src={images[active]}
              alt={venue.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_IMAGE;
              }}
              className="w-full h-[260px] sm:h-[420px] object-cover rounded-2xl bg-[#00000020]"
            />
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt={`${venue.title} ${i + 1}`}
                    loading="lazy"
                    onClick={() => setActive(i)}
                    className={`h-20 w-28 shrink-0 object-cover rounded-xl cursor-pointer border-2 ${
                      i === active ? "border-[#8A38F5]" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Mobile booking card */}
          <div className="block md:hidden mx-4">
            <BookingCard venue={venue} />
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 mx-4 sm:mx-6">
            {venue.description ? (
              <Card title="Description">
                <p className="whitespace-pre-line text-gray-700 text-sm sm:text-base">{venue.description}</p>
              </Card>
            ) : null}

            <Card title="Overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
                <div>
                  <Row label="Venue Type" value={venue.type_label || venue.type} />
                  <Row label="Capacity" value={`${venue.capacity} guests`} />
                  <Row label="Bedrooms" value={venue.bedrooms ? String(venue.bedrooms) : ""} />
                  <Row label="Pricing" value={unit} />
                </div>
                <div>
                  <Row label="Location" value={venue.city} />
                  <Row label="State" value={venue.state} />
                  <Row label="Minimum stay" value={venue.price_model === "night" && venue.min_nights > 1 ? `${venue.min_nights} nights` : ""} />
                  <Row label="Cleaning fee" value={venue.cleaning_fee ? `₹${Number(venue.cleaning_fee).toLocaleString("en-IN")}` : ""} />
                </div>
              </div>
            </Card>

            {(venue.videos?.length > 0 || youtubeId(venue.social_links?.youtube)) ? (
              <Card title="Videos">
                <div className="grid gap-4 sm:grid-cols-2">
                  {youtubeId(venue.social_links?.youtube) ? (
                    <iframe
                      className="w-full aspect-video rounded-xl"
                      src={`https://www.youtube-nocookie.com/embed/${youtubeId(venue.social_links.youtube)}`}
                      title={`${venue.title} video`}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : null}
                  {venue.videos?.map((src) => (
                    <video key={src} src={src} controls preload="metadata" className="w-full aspect-video rounded-xl bg-black" />
                  ))}
                </div>
              </Card>
            ) : null}

            {SOCIALS.some(({ key }) => venue.social_links?.[key]) ? (
              <Card title="Follow this venue">
                <div className="flex flex-wrap gap-3">
                  {SOCIALS.filter(({ key }) => venue.social_links?.[key]).map(({ key, label, Icon }) => (
                    <a
                      key={key}
                      href={venue.social_links[key]}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center gap-2 rounded-full border border-[#8A38F5] px-4 py-2 text-sm font-semibold text-[#8A38F5] hover:bg-purple-50"
                    >
                      <Icon /> {label}
                    </a>
                  ))}
                </div>
              </Card>
            ) : null}

            {venue.amenities?.length ? (
              <Card title="Amenities">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {venue.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <FiCheckCircle className="text-[#8A38F5] shrink-0" /> {a}
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

            {venue.rules ? (
              <Card title="House Rules">
                <p className="whitespace-pre-line text-gray-700 text-sm sm:text-base">{venue.rules}</p>
              </Card>
            ) : null}

            <Card title="Cancellation Policy">
              <p className="text-gray-700 text-sm sm:text-base">{venue.cancellation_text}</p>
            </Card>
          </div>
        </div>

        {/* Desktop booking card */}
        <div className="hidden md:block md:w-[50%] lg:w-[40%] xl:w-[35%]">
          <div className="sticky top-28">
            <BookingCard venue={venue} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 mt-6 pb-4">
        <AdvertisementCard className="mb-0" />
      </div>
    </div>
  );
}
