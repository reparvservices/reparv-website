import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaShareFromSquare,
} from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { addNewsVisitor } from "../utils/analytics";

export default function SocialNewsShare({ label, url }) {
  const { URI } = useAuth();
  const [showShare, setShowShare] = useState(false);
  const { newsId } = useParams();
  const [news, setNews] = useState({});

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/news/details/${newsId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setNews(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  const trackShare = () => {
    if (!news?.id) return;

    addNewsVisitor({
      URI,
      news_id: news.id,
      source: "share",
    });
  };

  useEffect(() => {
    fetchData();
  }, [newsId]);

  // Function to handle Instagram sharing (opens Instagram with the link)
  const shareOnInstagram = () => {
    trackShare();
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      url
    )}`;
    window.open(instagramUrl, "_blank");
  };

  // Function to copy the URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!"); // You can replace this with a toast notification
  };

  return (
    <div className="relative text-center">
      {/* Share Button */}

      <div
        className="flex gap-2 cursor-pointer active:scale-95"
        onClick={() => setShowShare(!showShare)}
      >
        <span className="font-semibold">{label}</span>
        <FaShareFromSquare className="w-5 h-5 text-[#8A38F5]" />
      </div>

      {/* Conditionally Render Share Options */}
      {showShare && (
        <div className="z-10 flex py-4 rounded-lg gap-4">
          {/* Copy Link Button */}
          <WhatsappShareButton
            url={url}
            onClick={() => {
              trackShare();
            }}
          >
            <span className="w-10 h-10 flex items-center justify-center border rounded-full border-[#8A38F5] cursor-pointer hover:text-white hover:bg-[#8A38F5] active:scale-95">
              <FaWhatsapp className="w-6 h-6" />
            </span>
          </WhatsappShareButton>

          <FacebookShareButton
            url={url}
            onClick={() => {
              trackShare();
            }}
          >
            <span className="w-10 h-10 flex items-center justify-center border rounded-full border-[#8A38F5] cursor-pointer hover:text-white hover:bg-[#8A38F5] active:scale-95">
              <FaFacebook className="w-6 h-6" />
            </span>
          </FacebookShareButton>

          {/* Instagram Share Button */}
          <button onClick={shareOnInstagram}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-full border-[#8A38F5] cursor-pointer hover:text-white hover:bg-[#8A38F5] active:scale-95">
              <FaInstagram className="w-6 h-6" />
            </span>
          </button>

          <LinkedinShareButton
            url={url}
            onClick={() => {
              trackShare();
            }}
          >
            <span className="w-10 h-10 flex items-center justify-center border rounded-full border-[#8A38F5] cursor-pointer hover:text-white hover:bg-[#8A38F5] active:scale-95">
              <FaLinkedin className="w-6 h-6" />
            </span>
          </LinkedinShareButton>

          <button onClick={copyToClipboard}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-full border-[#8A38F5] cursor-pointer hover:text-white hover:bg-[#8A38F5] active:scale-95">
              <MdContentCopy className="w-5 h-5" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
