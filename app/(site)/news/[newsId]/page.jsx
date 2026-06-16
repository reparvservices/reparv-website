import NewsDetailsPage from "@/views/NewsDetailsPage";
import { buildPageMetadata } from "@/lib/seo";

async function getNewsDetails(newsId) {
  try {
    const response = await fetch(
      `${process.env.VITE_BACKEND_URL}/frontend/news/details/${newsId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news details");
    }

    return await response.json();
  } catch (error) {
    console.error("News SEO Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const news = await getNewsDetails(params.newsId);

  return buildPageMetadata({
    title: news?.seoTitle,
    description:
      news?.seoDescription || "Stay updated with the latest real estate news, property trends, and market insights on Reparv News.",
    keywords: news?.seoKeywords,
    image: news?.image,
    type: "article",
    path: `/news/${news?.seoSlug}`,
  });
}

export default function Page() {
  return <NewsDetailsPage />;
}