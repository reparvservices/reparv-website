// Property video rules — same link shapes the server accepts
// (reparv-server src/core/utils/videoLinks.js).

export const YOUTUBE_REGEX =
  /^https?:\/\/(?:(?:www|m)\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/)|youtu\.be\/)([\w-]{11})(?:[?&#/].*)?$/i;

export const INSTAGRAM_REEL_REGEX =
  /^https?:\/\/(?:www\.)?instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/([\w-]+)\/?(?:[?#].*)?$/i;

export const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm", "video/x-m4v"];
export const MAX_VIDEO_BYTES = 200 * 1024 * 1024;

export const youtubeIdOf = (link) => String(link || "").trim().match(YOUTUBE_REGEX)?.[1] || "";

/** { videoLink?, instagramReelLink? } error messages for invalid (non-empty) links */
export const validateVideoLinks = ({ videoLink, instagramReelLink }) => {
  const errors = {};
  const yt = String(videoLink || "").trim();
  const ig = String(instagramReelLink || "").trim();
  if (yt && !YOUTUBE_REGEX.test(yt)) errors.videoLink = "Enter a valid YouTube link (watch, shorts or youtu.be)";
  if (ig && !INSTAGRAM_REEL_REGEX.test(ig)) errors.instagramReelLink = "Enter a valid Instagram reel link";
  return errors;
};

/** Error message for a picked video file, or "" when it is fine */
export const videoFileError = (file) => {
  if (!VIDEO_TYPES.includes(file?.type)) return "Upload an MP4, MOV or WEBM video";
  if (file.size > MAX_VIDEO_BYTES) return "Video must be 200 MB or smaller";
  return "";
};
