import ContactUs from "@/views/ContactUs";
import { buildPageMetadata } from "@/lib/seo";
import { getSeoData } from "@/lib/getSeoData";

export async function generateMetadata() {
  const seo = await getSeoData("contact-us");

  return buildPageMetadata({
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    path: "/contact-us",
  });
}

export default function Page() {
  return <ContactUs />;
}
