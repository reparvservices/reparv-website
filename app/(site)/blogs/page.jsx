import Blog from "@/views/Blog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Blogs",
  description: "Real estate guides and articles from Reparv.",
  path: "/blogs",
});

export default function Page() {
  return <Blog />;
}
