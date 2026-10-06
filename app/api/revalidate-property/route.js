import { revalidatePath } from "next/cache";

// Called by the partner/admin panels right before a property is shared on
// WhatsApp, so the link preview (og:image) shows the property's current photo
// instead of an ISR copy cached before the photo was uploaded.
// Body: the property's seoSlug as plain text (navigator.sendBeacon friendly).

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,199}$/i;
const MIN_INTERVAL_MS = 10_000;
const lastRefresh = new Map();

export async function POST(request) {
  const slug = (await request.text()).trim();
  if (!SLUG_PATTERN.test(slug)) {
    return new Response(null, { status: 400 });
  }

  // Public endpoint: at most one refresh per slug every few seconds
  const now = Date.now();
  if (now - (lastRefresh.get(slug) || 0) >= MIN_INTERVAL_MS) {
    lastRefresh.set(slug, now);
    if (lastRefresh.size > 5000) lastRefresh.clear();
    revalidatePath(`/property-info/${slug}`);
  }

  return new Response(null, { status: 204 });
}
