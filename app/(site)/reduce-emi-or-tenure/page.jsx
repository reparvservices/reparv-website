export { dynamic } from "@/lib/ssr";

import ReduceEmi from "@/views/ReduceEmi";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reduce EMI or Reduce Loan Tenure? Smart Guide | Reparv.in",
  description: "Confused between reducing EMI or loan tenure after prepayment? Reparv's free calculator & expert guide helps you compare both options. Make the smartest choice!",
  path: "/reduce-emi-or-tenure",
});

export default function Page() {
  return <ReduceEmi />;
}
