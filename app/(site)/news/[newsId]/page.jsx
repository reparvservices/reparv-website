import NewsDetailsPage from "@/views/NewsDetailsPage";
import { buildPageMetadata } from "@/lib/seo";

async function getNewsDetails(newsId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/frontend/news/details/${newsId}`,
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
    title:
      news?.seoTitle ||
      news?.title ||
      "Reparv News",
    description:
      news?.seoDescription ||
      "Stay updated with the latest real estate news, property trends, and market insights on Reparv News.",
    keywords: news?.seoKeywords,
    image: news?.thumbnail || news?.image,
    type: "article",
    path: `/news/${news?.seoSlug || params.newsId}`,
  });
}

export default function Page() {
  return <NewsDetailsPage />;
}