export { dynamic } from "@/lib/ssr";

import Venues from "@/views/Venues";
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
    const res = await fetch(`${getBackendUrl()}/customerapp/venues?limit=50`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.listings) ? data.listings : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const venues = await fetchVenues();
  return <Venues initialVenues={venues} />;
}
