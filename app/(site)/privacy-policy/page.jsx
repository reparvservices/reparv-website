import PrivacyPolicy from "@/views/PrivacyPolicy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy policy",
  description: "How Reparv handles your data.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
