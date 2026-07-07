import { notFound } from "next/navigation";
import BlogDetails from "@/views/BlogDetails";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildNoIndexMetadata,
  buildPageMetadata,
  buildArticleSchema,
} from "@/lib/seo";
import {
  fetchBlogDetailsCached,
  fetchBlogFaqsCached,
} from "@/lib/serverApi";
import {
  DETAIL_PAGE_REVALIDATE,
  generateBlogStaticParams,
} from "@/lib/staticParams";

export const revalidate = DETAIL_PAGE_REVALIDATE;
export const dynamicParams = true;

export async function generateStaticParams() {
  return generateBlogStaticParams();
}

export async function generateMetadata({ params }) {
  const blog = await fetchBlogDetailsCached(params.blogId);

  if (!blog?.id) {
    return buildNoIndexMetadata({
      title: "Page not found",
      description: "The page you requested could not be found on Reparv.",
      path: `/blog/${params.blogId}`,
    });
  }

  return buildPageMetadata({
    title: blog?.seoTittle || blog?.title || "Blog Article",
    description:
      blog?.seoDescription || "Read this article on the Reparv blog.",
    keywords: blog?.seoKeywords,
    image: blog?.thumbnail || blog?.image,
    type: "article",
    path: `/blog/${blog?.seoSlug || params.blogId}`,
  });
}

export default async function Page({ params }) {
  const blog = await fetchBlogDetailsCached(params.blogId);

  if (!blog?.id) {
    notFound();
  }

  const initialFaqs = await fetchBlogFaqsCached(blog.id);
  const path = `/blog/${blog?.seoSlug || params.blogId}`;

  const articleSchema = buildArticleSchema({
    title: blog?.seoTittle || blog?.title,
    description: blog?.seoDescription,
    image: blog?.thumbnail || blog?.image,
    path,
    datePublished: blog?.createdAt || blog?.publishedAt,
    dateModified: blog?.updatedAt,
  });

  return (
    <>
      <JsonLd data={articleSchema} />
      <BlogDetails initialBlog={blog} initialFaqs={initialFaqs} />
    </>
  );
}
