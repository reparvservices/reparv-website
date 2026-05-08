import AboutUs from "@/views/AboutUs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Reparv",
  description: "Learn about Reparv and our mission.",
  path: "/about-us",
});

export default function Page() {
  return <AboutUs />;
}
