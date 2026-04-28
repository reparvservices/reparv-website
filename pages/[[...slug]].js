import dynamic from "next/dynamic";

const ClientApp = dynamic(() => import("../src/NextClientApp"), {
  ssr: false,
});

export default function CatchAllPage() {
  return <ClientApp />;
}
