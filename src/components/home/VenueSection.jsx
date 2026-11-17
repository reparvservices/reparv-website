import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiMapPin, FiUsers } from "react-icons/fi";
import ViewAllButton from "./ViewAllButton";
import { useAuth } from "../../store/auth";

const HOME_VENUE_LIMIT = 6;
const rupees = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

function VenueCard({ venue }) {
  return (
    <Link
      href={`/venues/${venue.id}`}
      className="block overflow-hidden rounded-2xl border border-[#EDE9FE] bg-white shadow-sm transition hover:shadow-lg"
    >
      {venue.images?.[0] ? (
        <img
          src={venue.images[0]}
          alt={venue.title}
          loading="lazy"
          className="h-44 w-full object-cover sm:h-52"
        />
      ) : (
        <div className="h-44 w-full bg-[#F3F0FF] sm:h-52" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-semibold sm:text-lg">
            {venue.title}
          </h3>
          <span className="shrink-0 rounded-full bg-[#F3F0FF] px-3 py-1 text-xs font-semibold capitalize text-[#5E23DC]">
            {venue.type}
          </span>
        </div>
        <p className="mt-2 flex items-center gap-1 text-sm capitalize text-gray-500">
          <FiMapPin size={14} /> {venue.city}
          <span className="mx-1">·</span>
          <FiUsers size={14} /> up to {venue.capacity} guests
        </p>
        <p className="mt-3 text-lg font-bold text-[#5E23DC]">
          {rupees(venue.base_price)}
          <span className="text-xs font-normal text-gray-500">
            {" "}
            / {venue.price_model === "night" ? "night" : "slot"}
          </span>
        </p>
      </div>
    </Link>
  );
}

/** Home page strip: bookable villas, halls and venues, with a link to all of them. */
const VenueSection = () => {
  const { URI } = useAuth();
  const [venues, setVenues] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${URI}/customerapp/venues?limit=${HOME_VENUE_LIMIT}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data?.listings)) setVenues(data.listings);
      })
      .catch(() => {})
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, [URI]);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6 lg:py-10">
      <div className="flex items-center justify-center gap-6 pb-6">
        <div className="h-[3px] flex-1 bg-gradient-to-l from-[#5E23DC] to-[#FAF8FF]" />
        <h2 className="text-center text-lg font-bold sm:text-2xl md:text-4xl lg:text-5xl">
          Book <span className="text-[#8A38F5]">Villas, Halls</span> &amp; Venues
        </h2>
        <div className="h-[3px] flex-1 bg-gradient-to-r from-[#5E23DC] to-[#FAF8FF]" />
      </div>

      {venues.length > 0 ? (
        <>
          {/* Mobile: horizontal scroll; larger screens: grid */}
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 sm:hidden">
            {venues.map((v) => (
              <div key={v.id} className="min-w-[280px] snap-center">
                <VenueCard venue={v} />
              </div>
            ))}
          </div>
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </>
      ) : (
        loaded && (
          <div className="rounded-3xl bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] px-6 py-10 text-center text-white">
            <p className="text-lg font-semibold sm:text-2xl">
              Stays and event spaces, booked directly with verified hosts
            </p>
            <p className="mt-2 text-sm opacity-90 sm:text-base">
              Villas, farmhouses, banquet halls and more. New venues are added
              regularly.
            </p>
          </div>
        )
      )}

      <div className="mt-6">
        <ViewAllButton href="/venues" label="Explore all venues" />
      </div>
    </section>
  );
};

export default VenueSection;
