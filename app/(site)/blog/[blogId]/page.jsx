import BlogDetails from "@/views/BlogDetails";
import { buildPageMetadata } from "@/lib/seo";

async function getBlogDetails(blogId) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/frontend/blog/details/${blogId}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }

    return await response.json();
  } catch (error) {
    console.error("Blog SEO Fetch Error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlogDetails(params.blogId);

  return buildPageMetadata({
    title: blog?.seoTittle || blog?.title || "Blog Article",
    description:
      blog?.seoDescription || "Read this article on the Reparv blog.",
    keywords: blog?.seoKeywords,
    image: blog?.thumbnail || blog?.image,
    type: "article",
    path: `/blog/${params.blogId}`,
  });
}

export default function Page() {
  return <BlogDetails />;
}
