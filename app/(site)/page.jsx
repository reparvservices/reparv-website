import Home from "@/views/Home";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buy, Rent & Sell Verified Property in India",
  description: "Find verified homes, flats, plots and commercial listings across India on Reparv.",
  path: "/",
});

export default function Page() {
  return <Home />;
}
