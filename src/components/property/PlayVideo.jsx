import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";

const PlayVideo = () => {
  const { videoURL, setShowPlayVideo } = useAuth();

  return (
    <div className="absolute bottom-0 md:top-[150px] max-w-3xl overflow-scroll scrollbar-hide mx-auto w-full md:w-[600px] max-h-[380px] bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-xl shadow-xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-5 ">
        <h2 className="text-lg font-semibold">Property Video</h2>
        <RxCross2
          onClick={() => {
            setShowPlayVideo(false);
          }}
          className="w-5 h-5 sm:w-7 sm:h-7 cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>
      {/* Play Video */}
      <div className="flex w-full items-center justify-center">
        <video
          src={videoURL}
          controls
          autoPlay
          muted
          loop
          className="w-full max-w-[480px] max-h-[270px] rounded-lg"
        />
      </div>
    </div>
  );
};

export default PlayVideo;
