import { buildPageMetadata } from "@/lib/seo";
import HomeLoanPrepayment from "@/views/HomeLoanPrepayment";


export const metadata = buildPageMetadata({
  title: "Home Loan Prepayment",
  description: "Get help with property listings, bookings, documentation and more. Contact the Reparv support team or browse FAQs.",
  path: "/home-loan-prepayment",
});

export default function Page() {
  return <HomeLoanPrepayment />;
}
