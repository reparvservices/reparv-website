import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { IoPlayCircleOutline } from "react-icons/io5";

const VideoReviewSection = () => {
  const { URI } = useAuth();
  const [feedback, setFeedback] = useState([]);

  // **Fetch Data from API**
  const fetchFeedback = async () => {
    try {
      const response = await fetch(URI + "/frontend/testimonial", {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch testimonials.");
      const data = await response.json();
      
      const excludedClients = [
        "reparv",
        "sales partner",
        "territory partner",
        "project partner",
        "onboarding partner"
      ];
      const reparvFeedback = data.filter(
        (item) => !excludedClients.includes(item.client.toLowerCase())
      );
      setFeedback(reparvFeedback);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Extract YouTube Video ID
  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  return (
    <div className="w-full max-w-[1400px] flex flex-col gap-2 lg:justify-center lg:items-center mx-auto p-0 sm:p-5 pb-5 md:pb-15 ">
      <h2 className="text-center text-[20px] sm:text-[28px] leading-6 md:leading-15 font-semibold text-[#076300] ">
        See what customers are saying
      </h2>
      <div className="overflow-scroll scrollbar-hide w-full max-w-[1050px] grid grid-flow-col gap-4 sm:gap-6 my-2 sm:my-4 place-items-center px-4 cursor-pointer">
        {feedback.map((review) => {
          //const videoId = extractYouTubeId(review.url);
          return (
            <Link 
              href={review.url} target="_blank"
              key={review.id}
              style={{background:`url(${review.clientimage ? URI+review.clientimage : "/assets/home/formImage.svg"})`, backgroundSize:"cover"}}
              className="group bg-cover relative overflow-hidden w-[237px] h-100 rounded-xl border border-[#00000033] "
            > {/*
              {videoId ? (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              ) : (
                <p>Invalid video URL</p>
              )} */}

              <img src="/assets/home/cardShadow.svg" alt="image" className="w-full h-full object-cover" />
              <IoPlayCircleOutline className="absolute top-40 left-[84px] w-16 h-16 text-[#FAFAFB] group-hover:text-[#0BB501] group-active:scale-95"/>
              <div className="px-2 absolute bottom-8 left-6 border-l-3 text-white border-[#0BB501]">
                <p className="font-medium">{review.client}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoReviewSection;
