export { dynamic } from "@/lib/ssr";

import Link from "next/link";
import { getBackendUrl } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return buildPageMetadata({
    title: "Villas, Halls & Venues for Booking | Reparv",
    description:
      "Book villas, farmhouses, banquet halls and event venues directly with verified hosts on Reparv.",
    path: "/venues",
  });
}

async function fetchVenues() {
  try {
    const res = await fetch(`${getBackendUrl()}/customerapp/venues?limit=30`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.listings) ? data.listings : [];
  } catch {
    return [];
  }
}

const rupees = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default async function Page() {
  const venues = await fetchVenues();
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Villas, halls &amp; venues</h1>
      <p className="mt-2 text-gray-600">
        Book a stay or an event space directly. Booking and payment happen in
        the Reparv app.
      </p>

      {venues.length === 0 ? (
        <p className="mt-10 text-gray-500">
          No venues are available right now. Please check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map((v) => (
            <Link
              key={v.id}
              href={`/venues/${v.id}`}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              {v.images?.[0] ? (
                <img
                  src={v.images[0]}
                  alt={v.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-48 bg-gray-100" />
              )}
              <div className="p-4">
                <h2 className="font-semibold">{v.title}</h2>
                <p className="text-sm capitalize text-gray-500">
                  {v.type} · {v.city} · up to {v.capacity} guests
                </p>
                <p className="mt-2 font-bold text-[#5E23DC]">
                  {rupees(v.base_price)}
                  <span className="text-xs font-normal text-gray-500">
                    {" "}
                    / {v.price_model === "night" ? "night" : "slot"}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
