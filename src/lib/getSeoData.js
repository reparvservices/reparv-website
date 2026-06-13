// lib/getSeoData.js
export async function getSeoData(page) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/frontend/seo-data/${page}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch SEO data");

    return await response.json();
  } catch (error) {
    console.error("SEO Fetch Error:", error);
    return null;
  }
}
