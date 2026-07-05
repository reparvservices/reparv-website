const DEFAULT_BACKEND_URL = "https://aws-api.reparv.in";
const DEFAULT_S3_IMAGE_URL =
  "https://reparv-assets.s3.ap-south-1.amazonaws.com";

/** Single source of truth for API base URL (local via .env or production default). */
export function getBackendUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (typeof import.meta !== "undefined"
      ? import.meta.env?.VITE_BACKEND_URL
      : undefined) ||
    process.env.VITE_BACKEND_URL ||
    DEFAULT_BACKEND_URL
  );
}

export function getS3ImageUrl() {
  return (
    process.env.NEXT_PUBLIC_S3_IMAGE_URL ||
    process.env.VITE_S3_IMAGE_URL ||
    DEFAULT_S3_IMAGE_URL
  );
}

export function getGoogleClientId() {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    process.env.VITE_GOOGLE_CLIENT_ID ||
    ""
  );
}
