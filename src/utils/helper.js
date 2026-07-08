import { getS3ImageUrl } from "@/lib/env";

export const getImageURI = (path) => {
  // Fast exit
  if (!path || typeof path !== "string") return "";

  // Absolute URL or local public asset → return as-is
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  const base = getS3ImageUrl();

  // Ensure single slash between base and path
  return `${base}/${path.replace(/^\/+/, "")}`;
};

export function formatIndianUnit(value) {
  const num = Number(value);
  if (!num || num <= 0) return "";

  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2).replace(/\.00$/, "")} Thousand`;
  }
  return "";
}
