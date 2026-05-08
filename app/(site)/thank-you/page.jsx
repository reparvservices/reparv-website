import SuccessScreen from "@/views/SuccessScreen";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Thank you",
  description: "Your submission was received.",
  path: "/thank-you",
});

export default function Page() {
  return <SuccessScreen />;
}
