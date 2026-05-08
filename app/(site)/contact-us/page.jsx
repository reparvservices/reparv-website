import ContactUs from "@/views/ContactUs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact us",
  description: "Get in touch with the Reparv team.",
  path: "/contact-us",
});

export default function Page() {
  return <ContactUs />;
}
