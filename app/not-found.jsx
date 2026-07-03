export { dynamic } from "@/lib/ssr";

import ErrorPage from "@/views/ErrorPage";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata({
  title: "Page not found",
  description: "The page you requested could not be found on Reparv.",
  path: "/404",
});

export default function NotFound() {
  return <ErrorPage />;
}
