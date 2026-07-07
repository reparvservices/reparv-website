import { notFound } from "next/navigation";
import NewsDetailsPage from "@/views/NewsDetailsPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildNoIndexMetadata,
  buildPageMetadata,
  buildNewsArticleSchema,
} from "@/lib/seo";
import {
  fetchNewsCached,
  fetchNewsDetailsCached,
} from "@/lib/serverApi";
import {
  DETAIL_PAGE_REVALIDATE,
  generateNewsStaticParams,
} from "@/lib/staticParams";

export const revalidate = DETAIL_PAGE_REVALIDATE;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generateNewsStaticParams();
}

export async function generateMetadata({ params }) {
  const news = await fetchNewsDetailsCached(params.newsId);

  if (!news?.id) {
    return buildNoIndexMetadata({
      title: "Page not found",
      description: "The page you requested could not be found on Reparv.",
      path: `/news/${params.newsId}`,
    });
  }

  return buildPageMetadata({
    title: news?.seoTitle,
    description:
      news?.seoDescription ||
      "Stay updated with the latest real estate news, property trends, and market insights on Reparv News.",
    keywords: news?.seoKeywords,
    image: news?.image,
    type: "article",
    path: `/news/${news?.seoSlug || params.newsId}`,
  });
}

export default async function Page({ params }) {
  const [initialNews, initialNewsList] = await Promise.all([
    fetchNewsDetailsCached(params.newsId),
    fetchNewsCached(),
  ]);

  if (!initialNews?.id) {
    notFound();
  }

  const path = `/news/${initialNews?.seoSlug || params.newsId}`;
  const newsSchema = buildNewsArticleSchema({
    title: initialNews?.seoTitle || initialNews?.title,
    description: initialNews?.seoDescription,
    image: initialNews?.image,
    path,
    datePublished: initialNews?.created_at || initialNews?.published_at,
    dateModified: initialNews?.updated_at,
  });

  return (
    <>
      <JsonLd data={newsSchema} />
      <NewsDetailsPage
        initialNews={initialNews}
        initialNewsList={initialNewsList}
      />
    </>
  );
}
