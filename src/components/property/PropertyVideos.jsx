"use client";

import { useState } from "react";
import { FaYoutube, FaInstagram, FaPlay, FaVideo } from "react-icons/fa";
import { getImageURI } from "../../utils/helper";
import { youtubeIdOf, INSTAGRAM_REEL_REGEX } from "../../utils/videoLinks";

const reelCodeOf = (link) => String(link || "").trim().match(INSTAGRAM_REEL_REGEX)?.[1] || "";

function YouTubeCard({ id, title }) {
  // Show a thumbnail first; load the heavy YouTube player only when asked
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`${title} — YouTube video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play YouTube video"
          className="group absolute inset-0"
        >
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={`${title} video`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-[#FF0000] text-white shadow-lg">
            <FaPlay className="ml-1" size={20} />
          </span>
        </button>
      )}
    </div>
  );
}

/**
 * The property's videos: uploaded walkthrough, YouTube video and Instagram reel.
 * One item is shown at a time (tabs), so wide videos and the tall reel never
 * sit side by side. Renders nothing when the property has none.
 */
export default function PropertyVideos({ propertyInfo }) {
  const title = propertyInfo?.propertyName || "Property";
  const uploaded = propertyInfo?.propertyVideo ? getImageURI(propertyInfo.propertyVideo) : "";
  const ytId = youtubeIdOf(propertyInfo?.videoLink);
  const reelCode = reelCodeOf(propertyInfo?.instagramReelLink);

  const items = [
    uploaded && { key: "uploaded", label: "Walkthrough", icon: <FaVideo className="text-[#8A38F5]" /> },
    ytId && { key: "youtube", label: "YouTube", icon: <FaYoutube className="text-[#FF0000]" /> },
    reelCode && { key: "reel", label: "Instagram Reel", icon: <FaInstagram className="text-[#C13584]" /> },
  ].filter(Boolean);
  const [active, setActive] = useState(items[0]?.key);

  if (!items.length) return null;
  const current = items.some((v) => v.key === active) ? active : items[0].key;

  return (
    <section className="bg-white rounded-xl p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">Videos & Reels</h2>
        {items.length > 1 && (
          <div className="flex gap-1 overflow-x-auto rounded-lg bg-[#F6F1FF] p-1 scrollbar-hide">
            {items.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setActive(v.key)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs sm:text-sm font-semibold transition ${
                  current === v.key ? "bg-white text-black shadow-sm" : "text-[#5E23DC] hover:bg-white/60"
                }`}
              >
                {v.icon} {v.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {current === "uploaded" && (
        <video
          key={uploaded}
          src={uploaded}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-xl bg-black object-contain"
        />
      )}

      {current === "youtube" && <YouTubeCard id={ytId} title={title} />}

      {current === "reel" && (
        <div className="flex flex-col items-center rounded-xl bg-[#FAF8FF] px-3 py-5 sm:py-6">
          <div className="w-full max-w-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <iframe
              src={`https://www.instagram.com/reel/${reelCode}/embed/`}
              title={`${title} — Instagram reel`}
              loading="lazy"
              allowFullScreen
              scrolling="no"
              className="block h-[600px] w-full border-0"
            />
          </div>
          <a
            href={`https://www.instagram.com/reel/${reelCode}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C13584] hover:underline"
          >
            <FaInstagram /> Watch on Instagram
          </a>
        </div>
      )}
    </section>
  );
}
