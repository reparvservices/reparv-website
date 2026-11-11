import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  YOUTUBE_REGEX,
  INSTAGRAM_REEL_REGEX,
  youtubeIdOf,
  validateVideoLinks,
  videoFileError,
  MAX_VIDEO_BYTES,
} from "../../src/utils/videoLinks.js";

const VALID_YT = [
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://youtube.com/watch?feature=share&v=dQw4w9WgXcQ",
  "https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=10s",
  "https://youtu.be/dQw4w9WgXcQ",
  "https://youtu.be/dQw4w9WgXcQ?si=abc",
  "https://www.youtube.com/shorts/dQw4w9WgXcQ",
];
const INVALID_YT = [
  "https://vimeo.com/123",
  "https://www.youtube.com/watch?v=short",
  "youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/channel/UC123",
];
const VALID_IG = [
  "https://www.instagram.com/reel/Cabc123/",
  "https://instagram.com/reels/Cabc123",
  "https://www.instagram.com/someuser/reel/Cabc123/?igsh=x",
  "https://www.instagram.com/p/Cabc123/",
];
const INVALID_IG = ["https://www.instagram.com/someuser/", "https://facebook.com/reel/1"];

test("YouTube regex accepts watch/shorts/youtu.be and rejects others", () => {
  for (const l of VALID_YT) assert.ok(YOUTUBE_REGEX.test(l), l);
  for (const l of INVALID_YT) assert.ok(!YOUTUBE_REGEX.test(l), l);
});

test("Instagram regex accepts reel/reels/p links and rejects others", () => {
  for (const l of VALID_IG) assert.ok(INSTAGRAM_REEL_REGEX.test(l), l);
  for (const l of INVALID_IG) assert.ok(!INSTAGRAM_REEL_REGEX.test(l), l);
});

test("youtubeIdOf extracts the 11-char id", () => {
  for (const l of VALID_YT) assert.equal(youtubeIdOf(l), "dQw4w9WgXcQ");
  assert.equal(youtubeIdOf("  https://youtu.be/dQw4w9WgXcQ  "), "dQw4w9WgXcQ");
  assert.equal(youtubeIdOf(""), "");
  assert.equal(youtubeIdOf(null), "");
});

test("validateVideoLinks reports only invalid non-empty links", () => {
  assert.deepEqual(validateVideoLinks({}), {});
  assert.deepEqual(validateVideoLinks({ videoLink: " ", instagramReelLink: "" }), {});
  assert.deepEqual(validateVideoLinks({ videoLink: VALID_YT[0], instagramReelLink: VALID_IG[0] }), {});
  const errs = validateVideoLinks({ videoLink: "bad", instagramReelLink: "bad" });
  assert.ok(errs.videoLink);
  assert.ok(errs.instagramReelLink);
});

test("videoFileError checks type and 200 MB limit", () => {
  assert.equal(videoFileError({ type: "video/mp4", size: 1000 }), "");
  assert.equal(videoFileError({ type: "video/mp4", size: MAX_VIDEO_BYTES }), "");
  assert.match(videoFileError({ type: "video/mp4", size: MAX_VIDEO_BYTES + 1 }), /200 MB/);
  assert.match(videoFileError({ type: "image/png", size: 10 }), /MP4/);
  assert.match(videoFileError(undefined), /MP4/);
});

// Website and API must agree, otherwise the form accepts links the server rejects.
const SERVER_RULES = fileURLToPath(
  new URL("../../../reparv-server/src/core/utils/videoLinks.js", import.meta.url),
);

test("website video-link rules match reparv-server", { skip: !existsSync(SERVER_RULES) && "reparv-server not checked out next to the website" }, async () => {
  const server = await import(SERVER_RULES);
  const samples = [...VALID_YT, ...INVALID_YT].flatMap((yt) =>
    [...VALID_IG, ...INVALID_IG, ""].map((ig) => ({ videoLink: yt, instagramReelLink: ig })),
  );
  for (const s of samples) {
    const websiteOk = Object.keys(validateVideoLinks(s)).length === 0;
    const serverOk = !server.parsePropertyVideoLinks(s).error;
    assert.equal(websiteOk, serverOk, JSON.stringify(s));
  }
});
