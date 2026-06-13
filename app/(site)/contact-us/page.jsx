import ContactUs from "@/views/ContactUs";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("contact-us");

  return buildPageMetadata({
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    path: "/contact-us",
  });
}

export default function Page() {
  return <ContactUs />;
}
