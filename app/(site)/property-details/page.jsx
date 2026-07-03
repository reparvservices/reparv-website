export { dynamic } from "@/lib/ssr";

import { redirect } from "next/navigation";

export default function PropertyDetailsIndexPage() {
  redirect("/properties");
}
