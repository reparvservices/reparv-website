"use client";

import { FaYoutube, FaInstagram, FaVideo } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { getImageURI } from "../../utils/helper";
import { youtubeIdOf, videoFileError } from "../../utils/videoLinks";

const PURPLE = "#8A38F5";
const GRAY = "#868686";
const inputBase = "w-full px-4 py-2 rounded-lg border outline-none focus:border-[#8A38F5]";
const borderFor = (error) => (error ? "border-red-500" : "border-[#E0E0E0]");

/**
 * Optional property videos: an uploaded walkthrough video, a YouTube link and an
 * Instagram reel link. Used by the add and edit listing forms.
 *
 * video          : { file, preview } picked in this session, or null
 * savedVideoUrl  : already-saved propertyVideo (edit form), "" when none/removed
 * onVideoChange  : (videoOrNull) => void
 * onRemoveSaved  : () => void            (edit form only)
 * links          : { videoLink, instagramReelLink }
 * onLinksChange  : (patch) => void
 * errors         : { video?, videoLink?, instagramReelLink? }
 * setErrors      : (updater) => void
 */
export default function PropertyVideoFields({
  video,
  savedVideoUrl = "",
  onVideoChange,
  onRemoveSaved,
  links,
  onLinksChange,
  errors = {},
  setErrors,
  disabled = false,
}) {
  const ytId = youtubeIdOf(links.videoLink);
  const shownVideo = video?.preview || (savedVideoUrl ? getImageURI(savedVideoUrl) : "");

  const pickVideo = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const error = videoFileError(file);
    setErrors((prev) => ({ ...prev, video: error }));
    if (error) return;
    if (video) URL.revokeObjectURL(video.preview);
    onVideoChange({ file, preview: URL.createObjectURL(file) });
  };

  const removeVideo = () => {
    if (video) {
      URL.revokeObjectURL(video.preview);
      onVideoChange(null);
    } else {
      onRemoveSaved?.();
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 mb-1 text-black">
        <FaVideo color={PURPLE} /> Videos <span className="text-base text-gray-400 font-normal">(optional)</span>
      </h3>
      <p className="text-sm mb-4" style={{ color: GRAY }}>
        A short walkthrough video or reel helps buyers decide faster.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upload */}
        <div>
          <p className="flex items-center gap-2 text-sm font-medium mb-2">
            <FaVideo className="text-[#8A38F5]" /> Walkthrough video
          </p>
          {shownVideo ? (
            <div className="relative rounded-lg overflow-hidden border border-[#D9D9D9] bg-black">
              <video key={shownVideo} src={shownVideo} controls preload="metadata" className="w-full aspect-video object-contain" />
              <button
                type="button"
                onClick={removeVideo}
                disabled={disabled}
                aria-label="Remove video"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow"
              >
                <RxCross2 />
              </button>
              {!video && (
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-2 py-0.5 text-[11px] text-white">
                  Current video
                </span>
              )}
            </div>
          ) : (
            <label
              className={`flex aspect-video flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-center px-3 transition ${
                errors.video ? "border-red-400" : "border-[#D9D9D9] hover:border-[#8A38F5]"
              } ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
            >
              <FaVideo className="text-2xl text-[#8A38F5]" />
              <span className="text-sm font-semibold">Choose video</span>
              <span className="text-xs" style={{ color: GRAY }}>
                MP4, MOV or WEBM · up to 200 MB
              </span>
              <input
                type="file"
                accept="video/mp4,video/quicktime,video/webm,video/x-m4v"
                onChange={pickVideo}
                disabled={disabled}
                className="hidden"
              />
            </label>
          )}
          {errors.video && <p className="text-xs text-red-500 mt-1">{errors.video}</p>}
        </div>

        {/* YouTube */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <FaYoutube className="text-red-600" /> YouTube link
          </label>
          <input
            type="url"
            value={links.videoLink || ""}
            onChange={(e) => {
              onLinksChange({ videoLink: e.target.value });
              setErrors((prev) => ({ ...prev, videoLink: "" }));
            }}
            placeholder="https://youtu.be/..."
            disabled={disabled}
            className={`${inputBase} ${borderFor(errors.videoLink)}`}
          />
          {errors.videoLink && <p className="text-xs text-red-500 mt-1">{errors.videoLink}</p>}
          {ytId && (
            <img
              src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
              alt="YouTube preview"
              className="mt-2 w-full aspect-video rounded-lg object-cover border border-[#D9D9D9]"
            />
          )}
        </div>

        {/* Instagram */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <FaInstagram className="text-pink-600" /> Instagram reel link
          </label>
          <input
            type="url"
            value={links.instagramReelLink || ""}
            onChange={(e) => {
              onLinksChange({ instagramReelLink: e.target.value });
              setErrors((prev) => ({ ...prev, instagramReelLink: "" }));
            }}
            placeholder="https://www.instagram.com/reel/..."
            disabled={disabled}
            className={`${inputBase} ${borderFor(errors.instagramReelLink)}`}
          />
          {errors.instagramReelLink && <p className="text-xs text-red-500 mt-1">{errors.instagramReelLink}</p>}
          <p className="text-xs mt-1" style={{ color: GRAY }}>
            Open the reel on Instagram → Share → Copy link
          </p>
        </div>
      </div>
    </div>
  );
}
