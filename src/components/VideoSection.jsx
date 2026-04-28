import React, { useState, useEffect } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import videoThumb from "../assets/joinOurTeam/salesPartner/videoThumb.svg";
import { useAuth } from "../store/auth";

const VideoSection = ({videoFor = "reparv"}) => {
  const { URI } = useAuth();
  const [showVideo, setShowVideo] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  
  const [thumbnail, setThumbnail] = useState(videoThumb);

  const formatYouTubeEmbedUrl = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    const videoId = match ? match[1] : null;
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : "";
  };
  // **Fetch Data from API**
  const fetchFeedback = async () => {
    try {
      const response = await fetch(URI + "/frontend/testimonial", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch testimonials.");

      const data = await response.json();
      const reparvFeedback = data.filter(
        (item) => item.client.toLowerCase() === videoFor.toLowerCase()
      );

      if (reparvFeedback.length > 0 && reparvFeedback[0].url) {
        const videoURL = formatYouTubeEmbedUrl(reparvFeedback[0].url);
        if (videoURL) {
          setVideoLink(videoURL);
          if( reparvFeedback[0].clientimage && reparvFeedback[0].clientimage !== "null") {
            setThumbnail(`${URI}${reparvFeedback[0]?.clientimage}`);
          }
        } else {
          alert("Invalid YouTube URL");
        }
      } else {
        alert("No Video Found");
      }
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="relative w-full max-w-4xl flex items-center justify-center rounded-xl shadow-[0px_4px_8px_0px_#0000001A] overflow-hidden">
        {/* Thumbnail */}
        {!showVideo && (
          <img
            src={videoThumb}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
        )}

        {showVideo && videoLink && (
          <div className="relative w-full h-[200px] sm:h-[400px]">
            {" "}
            {/* FIXED HEIGHT */}
            <iframe
              className="w-full h-full"
              src={videoLink}
              title="YouTube video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Play Button Overlay */}
        {!showVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
            <button
              onClick={() => setShowVideo(true)}
              className="w-20 h-20 bg-[#00000099] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <IoPlayCircleOutline className="text-white w-12 h-12" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
