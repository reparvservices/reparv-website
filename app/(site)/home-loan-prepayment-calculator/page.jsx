export { dynamic } from "@/lib/ssr";

import { buildPageMetadata } from "@/lib/seo";
import HomeLoanPrepayment from "@/views/HomeLoanPrepayment";

export const metadata = buildPageMetadata({
  title: "Home Loan Prepayment Calculator – Save Interest | Reparv",
  description:
    "Want to save lakhs on home loan interest? Use Reparv's free prepayment calculator to see how much you save. Reduce EMI or tenure — compare & decide instantly!",
  path: "/home-loan-prepayment-calculator",
});

export default function Page() {
  return <HomeLoanPrepayment />;
}
