import BlogDetails from "@/views/BlogDetails";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata({ params }) {
  const { blogId } = params;
  return buildPageMetadata({
    title: "Blog article",
    description: "Read this article on the Reparv blog.",
    path: `/blog/${blogId}`,
  });
}

export default function Page() {
  return <BlogDetails />;
}
