import { getS3ImageUrl } from "@/lib/env";

export const getImageURI = (path) => {
  if (!path || typeof path !== "string") return "";

  const trimmed = path.trim();
  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }

  // Local files served from /public (e.g. /assets/...)
  if (trimmed.startsWith("/assets/")) {
    return trimmed;
  }

  const base = getS3ImageUrl().replace(/\/$/, "");

  // API paths like /uploads/foo.jpg or uploads/foo.jpg → S3
  return `${base}/${trimmed.replace(/^\/+/, "")}`;
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
