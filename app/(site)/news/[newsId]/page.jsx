import NewsDetailsPage from "@/views/NewsDetailsPage";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { newsId } = params;
  return buildPageMetadata({
    title: "News",
    description: "Read the latest real estate news on Reparv.",
    path: `/news/${newsId}`,
  });
}

export default function Page() {
  return <NewsDetailsPage />;
}
