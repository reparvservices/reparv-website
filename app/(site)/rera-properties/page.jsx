import ReraProperty from "@/views/ReraProperty";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "RERA properties",
  description: "Browse RERA-registered projects and listings.",
  path: "/rera-properties",
});

export default function Page() {
  return <ReraProperty />;
}
