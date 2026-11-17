export { dynamic } from "@/lib/ssr";

import { notFound } from "next/navigation";
import { getBackendUrl } from "@/lib/env";
import { buildPageMetadata } from "@/lib/seo";

const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.reparvcustomer";

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
  if (!v) return buildPageMetadata({ title: "Venue not found | Reparv", path: `/venues/${params.id}` });
  return buildPageMetadata({
    title: `${v.title} in ${v.city} | Book on Reparv`,
    description: (v.description || `${v.type} in ${v.city} for up to ${v.capacity} guests.`).slice(0, 155),
    path: `/venues/${v.id}`,
  });
}

const rupees = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

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
    priceRange: rupees(v.base_price),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {v.images?.length ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {v.images.slice(0, 4).map((src, i) => (
            <img key={src} src={src} alt={`${v.title} photo ${i + 1}`} className={`w-full rounded-xl object-cover ${i === 0 ? "h-72 sm:col-span-2" : "h-48"}`} />
          ))}
        </div>
      ) : null}

      <h1 className="mt-6 text-3xl font-bold">{v.title}</h1>
      <p className="mt-1 capitalize text-gray-500">
        {v.type} · {[v.address, v.city].filter(Boolean).join(", ")} · up to {v.capacity} guests
        {v.bedrooms ? ` · ${v.bedrooms} bedrooms` : ""}
      </p>
      <p className="mt-3 text-2xl font-bold text-[#5E23DC]">
        {rupees(v.base_price)}
        <span className="text-sm font-normal text-gray-500"> / {v.price_model === "night" ? "night" : "slot"}</span>
      </p>

      {v.description ? <p className="mt-6 whitespace-pre-line text-gray-700">{v.description}</p> : null}

      {v.amenities?.length ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {v.amenities.map((a) => (
            <span key={a} className="rounded-full bg-violet-50 px-3 py-1 text-sm text-[#5E23DC]">{a}</span>
          ))}
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Cancellation policy</h2>
        <p className="mt-1 text-gray-700">{v.cancellation_text}</p>
      </section>
      {v.rules ? (
        <section className="mt-6">
          <h2 className="text-lg font-semibold">House rules</h2>
          <p className="mt-1 whitespace-pre-line text-gray-700">{v.rules}</p>
        </section>
      ) : null}

      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block rounded-xl bg-[#5E23DC] px-8 py-3 font-semibold text-white"
      >
        Book in the Reparv app
      </a>
    </main>
  );
}
