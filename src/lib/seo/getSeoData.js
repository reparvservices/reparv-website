import { getBackendUrl } from "../env";

export async function getSeoData(page) {
  try {
    const response = await fetch(
      `${getBackendUrl()}/frontend/seo-data/${page}`,
      { cache: "no-store" },
    );

    if (!response.ok) throw new Error("Failed to fetch SEO data");

    return await response.json();
  } catch (error) {
    console.error("SEO Fetch Error:", error);
    return null;
  }
}
