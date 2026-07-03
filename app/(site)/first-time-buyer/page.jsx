export { dynamic } from "@/lib/ssr";

import FirstTimeBuyerPage from "@/views/FirstTimeBuyer.jsx";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "First Time Home Buyer Stories in Nagpur | Reparv.in ",
  description: "Explore real first-time home buyer journeys from Nagpur. Learn how they navigated loans, paperwork & property search. Read their stories & start your journey!",
  path: "/first-time-buyer",
});

export default function Page() {
  return <FirstTimeBuyerPage />;
}
