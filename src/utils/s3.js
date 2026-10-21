import { getBackendUrl } from "../lib/env";

const URI = getBackendUrl();

export const uploadToS3 = async (file) => {
  try {
    const res = await fetch(`${URI}/api/s3/signed-url/get`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
        folder: "uploads", // No folder, upload to root
      }),
    });

    if (!res.ok) throw new Error("Failed to get signed URL");

    const { uploadUrl, fileUrl } = await res.json();
    
    const upload = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!upload.ok) throw new Error(`S3 upload failed: ${upload.status}`);


    return fileUrl;
  } catch (err) {
    console.error("S3 upload failed:", err);
    return null;
  }
};
const safeFileName = (name) =>
  String(name || "file")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(-80);

/**
 * Like uploadToS3, but reports progress (for large files such as videos).
 * Resolves with the public S3 URL, rejects with a readable error.
 */
export const uploadToS3WithProgress = async (file, { folder = "uploads", onProgress } = {}) => {
  const res = await fetch(`${URI}/api/s3/signed-url/get`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName: safeFileName(file.name), fileType: file.type, folder }),
  });
  if (!res.ok) throw new Error("Could not start the upload");
  const { uploadUrl, fileUrl } = await res.json();

  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Video upload failed. Please check your connection and try again."));
    xhr.send(file);
  });

  return fileUrl;
};
