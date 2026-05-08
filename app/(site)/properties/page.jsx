import Properties from "@/views/Properties";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Properties for sale and rent in India",
  description: "Browse verified property listings — buy, rent or invest across Indian cities.",
  path: "/properties",
});

export default function Page() {
  return <Properties />;
}
