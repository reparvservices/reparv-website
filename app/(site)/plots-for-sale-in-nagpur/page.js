import PlotsForSale from "@/views/PlotsForSale";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Plots for Sale in Nagpur – RERA Verified Listings | Reparv",
  description: "Find RERA-approved residential & commercial plots in Nagpur with clear legal titles. Verified by Reparv experts. Explore top locations & contact sellers today!",
  path: "/plots-for-sale-in-nagpur",
});

export default function Page() {
  return <PlotsForSale />;
}
