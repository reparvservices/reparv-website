import AboutUs from "@/views/AboutUs";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("about-us");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/about-us",
  });
}

export default function Page() {
  return <AboutUs />;
}
