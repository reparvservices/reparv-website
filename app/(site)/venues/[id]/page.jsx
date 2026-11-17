export { dynamic } from "@/lib/ssr";

import { notFound } from "next/navigation";
import VenueDetails from "@/views/VenueDetails";
import { getBackendUrl } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

async function fetchVenue(id) {
  if (!/^\d+$/.test(String(id))) return null;
  try {
    const res = await fetch(`${getBackendUrl()}/customerapp/venues/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.listing || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const v = await fetchVenue(params.id);
  if (!v) {
    return buildPageMetadata({ title: "Venue not found | Reparv", path: `/venues/${params.id}` });
  }
  return buildPageMetadata({
    title: `${v.title} in ${v.city} | Book on Reparv`,
    description: (v.description || `${v.type} in ${v.city} for up to ${v.capacity} guests.`).slice(0, 155),
    path: `/venues/${v.id}`,
  });
}

export default async function Page({ params }) {
  const v = await fetchVenue(params.id);
  if (!v) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: v.title,
    description: v.description || undefined,
    image: v.images?.[0],
    address: { "@type": "PostalAddress", addressLocality: v.city, streetAddress: v.address || undefined },
    priceRange: `₹${Number(v.base_price).toLocaleString("en-IN")}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VenueDetails venue={v} />
    </>
  );
}
