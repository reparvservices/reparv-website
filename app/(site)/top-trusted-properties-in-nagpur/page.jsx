export { dynamic } from "@/lib/ssr";

import TrustScorePage from "@/views/TrustScorePage";
import { buildPageMetadata } from "@/lib/seo";


export const metadata = buildPageMetadata({
  title: "Top Trusted Properties in Nagpur | Reparv Verified List",
  description: "Browse Nagpur's most trusted & verified property listings on Reparv. Genuine sellers, clear titles & fair pricing. Find your ideal home with full confidence!",
  path: "/top-trusted-properties-in-nagpur",
});

export default function Page() {
  return <TrustScorePage />;
}
