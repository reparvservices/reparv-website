import HomeLoanForm from "@/views/HomeLoanForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Home loan application",
  description: "Apply for a home loan with Reparv.",
  path: "/home-loan-application",
});

export default function Page() {
  return <HomeLoanForm />;
}
