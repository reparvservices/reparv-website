import { getBackendUrl } from "./env";

export const DETAIL_PAGE_REVALIDATE = 3600;

const BUILD_FETCH_OPTIONS = { next: { revalidate: DETAIL_PAGE_REVALIDATE } };

async function buildFetch(path, options = BUILD_FETCH_OPTIONS) {
  try {
    const response = await fetch(`${getBackendUrl()}${path}`, options);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`buildFetch error (${path}):`, error);
    return [];
  }
}

function uniqueStringParams(values, key) {
  return [...new Set(values.filter(Boolean).map(String))].map((value) => ({
    [key]: value,
  }));
}

export async function generateBlogStaticParams() {
  const blogs = await buildFetch("/frontend/blog");
  return uniqueStringParams(
    blogs.map((blog) => blog.seoSlug || blog.id),
    "blogId",
  );
}

export async function generateNewsStaticParams() {
  const newsItems = await buildFetch("/frontend/news/");
  return uniqueStringParams(
    newsItems.map((item) => item.seoSlug || item.id),
    "newsId",
  );
}

export async function generatePropertyStaticParams() {
  const noStore = { cache: "no-store" };
  const [cityProperties, slugProperties] = await Promise.all([
    buildFetch("/frontend/all-properties/Nagpur", noStore),
    buildFetch("/frontend/properties/get-all-by-slug?city=Nagpur", noStore),
  ]);

  const ids = new Set();

  for (const property of [...cityProperties, ...slugProperties]) {
    if (property?.seoSlug) ids.add(String(property.seoSlug));
    if (property?.propertyid) ids.add(String(property.propertyid));
  }

  return [...ids].map((id) => ({ id }));
}
