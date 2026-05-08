import RefundPolicy from "@/views/RefundPolicy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Cancellation policy",
  description: "Refunds and cancellations policy.",
  path: "/cancellation-policy",
});

export default function Page() {
  return <RefundPolicy />;
}
