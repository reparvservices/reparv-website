import TrustScorePage from "@/views/TrustScorePage";
import { buildPageMetadata } from "@/lib/seo";


export const metadata = buildPageMetadata({
  title: "Trust Score",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/trust-score",
});

export default function Page() {
  return <TrustScorePage />;
}
