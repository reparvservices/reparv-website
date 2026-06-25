const DEFAULT_BACKEND_URL = "https://aws-api.reparv.in";
const DEFAULT_S3_IMAGE_URL =
  "https://reparv-assets.s3.ap-south-1.amazonaws.com";

export function getBackendUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
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
