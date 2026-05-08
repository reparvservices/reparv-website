import TermsAndConditions from "@/views/TermsAndConditions";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms and conditions",
  description: "Terms of using Reparv.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return <TermsAndConditions />;
}
