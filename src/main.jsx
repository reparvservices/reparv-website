import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

/**
 * Primary dev server: `npm run dev` (Next.js App Router).
 * This entry is only for optional Vite workflows.
 */
function Root() {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <p>
        This app is served with <strong>Next.js</strong>. Run{" "}
        <code>npm run dev</code> for local development.
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
