import NewsPage from "@/views/NewsSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "News",
  description: "Latest real estate news and updates.",
  path: "/news",
});

export default function Page() {
  return <NewsPage />;
}
