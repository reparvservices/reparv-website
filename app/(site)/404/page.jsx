export { dynamic } from "@/lib/ssr";

import ErrorPage from "@/views/ErrorPage";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Page not found",
  description: "This page could not be found.",
  path: "/404",
});

export default function Page() {
  return <ErrorPage />;
}
