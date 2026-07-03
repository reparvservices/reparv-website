export { dynamic } from "@/lib/ssr";

import SuccessScreen from "@/views/SuccessScreen";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Thank you",
  description: "Your submission was received.",
  path: "/thank-you",
});

export default function Page() {
  return <SuccessScreen />;
}
