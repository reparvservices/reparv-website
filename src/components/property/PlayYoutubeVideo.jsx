import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";

const PlayYoutubeVideo = () => {
  const { videoURL, setShowPlayVideo } = useAuth();
  //const videoURL = "https://youtu.be/3P7EVPGau0I?si=-6TyOwN6C1tVCzNO"
  // Convert YouTube link into embeddable URL
  const getEmbedURLOld = (url) => {
    if (!url) return null;

    // Handle normal and short YouTube URLs
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    // fallback: return null if not a YouTube URL
    return null;
  };

  const getEmbedURL = (url) => {
  if (!url) return null;

  // Detect all YouTube formats including shorts
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regex);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return null;
};

  const embedURL = getEmbedURL(videoURL);

  return (
    <div className="absolute bottom-0 md:top-[150px] max-w-3xl overflow-scroll scrollbar-hide mx-auto w-full md:w-[600px] max-h-[380px] bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-xl shadow-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-5">
        <h2 className="text-lg font-semibold">Property Video</h2>
        <RxCross2
          onClick={() => setShowPlayVideo(false)}
          className="w-5 h-5 sm:w-7 sm:h-7 cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>

      {/* Video Section */}
      <div className="flex w-full items-center justify-center">
        {embedURL ? (
          <iframe
            src={embedURL}
            title="YouTube Video Player"
            allowFullScreen
            className="w-full max-w-[480px] h-[270px] rounded-lg"
          />
        ) : (
          <p className="text-gray-500 text-center">
            Invalid or missing YouTube video link.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayYoutubeVideo;