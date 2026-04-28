import React from "react";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { IoShareSocialSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
//import HomePropertySection from "../components/homeOld/HomePropertySection";
import { useAuth } from "../store/auth";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import { useNavigate } from "react-router-dom";
import SocialShare from "../components/SocialShare";
import { FaArrowLeft } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import BlogSection from "../components/blog/BlogSection";
import BlogFeatureProperties from "../components/blog/BlogFeaturedProperties";
import BlogFeedback from "../components/blog/BlogFeedback";
import FaqSection from "../components/blog/FaqSection";
import DreamHomeCTA from "../components/blog/DreamHomeCTA";
import { getImageURI } from "../utils/helper";
import { addBlogVisitor } from "../utils/analytics";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import BlogImage from "../assets/blog/BlogImage.webp";
import FAQSection from "../components/FAQSection";
import AdvertisementCard from "../components/AdvertisementCard";

function BlogDetails() {
  const navigate = useNavigate();

  const { URI, user, setShowLogin, selectedCity, setShowAlert } = useAuth();
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});
  const [blogHeight, setBlogHeight] = useState(true);

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/blog/details/${blogId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  const addLike = async () => {
    if (!user?.id) {
      setShowLogin(true);
      return;
    }

    if (!blog?.id) return;

    try {
      const response = await fetch(`${URI}/user/activity/blog-like`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: blog?.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like failed");
      }

      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "success",
        message: data.message,
      }));
      fetchData();
      return data;
    } catch (error) {
      setShowAlert((prev) => ({
        ...prev,
        show: true,
        type: "error",
        message: error.message || "Something went wrong",
      }));
      
      console.error("Blog like error:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogId]);

  useEffect(() => {
    if (!blog?.id) return;

    const sessionKey = `viewed_blog_${blog.id}`;

    if (!sessionStorage.getItem(sessionKey)) {
      addBlogVisitor({
        URI,
        blog_id: blog.id,
        source: "view",
      });

      sessionStorage.setItem(sessionKey, "true");
    }
  }, [blog?.id, URI]);

  return (
    <>
      <SEO
        title={
          blog?.seoTittle ||
          "Buy Property in Nagpur Easily with Reparv’s Expert Help"
        }
        description={
          blog?.seoDescription ||
          "Looking to buy property in Nagpur or nearby? Reparv provides full support from site visits and loans to legal documentation and registry — making real estate hassle-free."
        }
        canonical={`https://www.reparv.in/property-info/${blogId}`}
      />
      <div className="w-[1380px] text-xs sm:text-sm space-y-2 mx-auto py-4 px-4">
        <h2>{"Home> Blogs> Investment> Blog Title"}</h2>
        <h2>By Reparv | {blog?.updatedAt}</h2>
      </div>

      <div className="w-full  px-4 sm:px-6">
        {/* Blog Body */}
        <div
          className={`w-full max-w-[1380px]  ${
            blogHeight ? "h-auto" : "h-auto"
          } mx-auto overflow-hidden flex gap-6 md:gap-9 items-start justify-between`}
        >
          <div className="w-full lg:w-[70%] bg-white">
            <div className="w-full flex flex-col backImage relative mb-4 sm:mb-6">
              <img
                src={
                  getImageURI(blog?.image) ||
                  BlogImage
                }
                alt={blog?.tittle}
                loading="lazy"
                className="w-full mx-auto object-cover"
              />
              {/* Like Button */}
              <div className="absolute top-5 right-5 flex gap-4">
                <div
                  onClick={() => {
                    addLike(blog?.id);
                  }}
                  className="w-[100px] h-[32px] sm:w-[120px] sm:h-[40px] text-[#8A38F5] bg-[white] border border-[#8A38F5] rounded-lg cursor-pointer relative overflow-hidden active:scale-95"
                >
                  <div className="overflow-hidden relative z-10 w-full h-full flex gap-2 items-center justify-center ">
                    <FaHeart className="w-5 sm:w-6 h-5 sm:h-6" />
                    <span className="text-sm sm:text-base font-bold text-[black]">
                      Like
                    </span>{" "}
                    <span className="absolute shine-layer"></span>
                  </div>
                </div>
              </div>
            </div>
            {/* Blog Heading */}
            <div className="w-full flex-items-center justify-center sm:px-4">
              <h1 className="text-lg sm:text-[36px] font-bold text-[#3F2D62]">
                {blog?.tittle}
              </h1>
            </div>
            <div
              className="blog-content prose max-w-none sm:px-4"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
            <div className="w-full sm:p-4">
              <div className="w-full mx-auto py-4 border-b border-y-[#00000033] bg-[white]">
                <SocialShare
                  label={"Share this article"}
                  url={"https://www.reparv.in/blog/" + blogId}
                ></SocialShare>
              </div>
              <div className="w-full sm:px-4 flex flex-wrap gap-4 sm:gap-6 py-4 bg-white overflow-scroll scrollbar-hide">
                <div className="flex gap-2 items-center">
                  <div className="!w-10 !h-10 flex items-center justify-center rounded-full bg-[#F1F1F1]">
                    <IoMdEye className="w-5 h-5 text-[10px] text-black " />
                  </div>
                  <span className="text-black font-bold text-xs">
                    {blog?.views || 0}
                  </span>
                  <span className="text-[#868686] text-xs">Viewed</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F1F1]">
                    <IoShareSocialSharp className="w-5 h-5 text-[10px] text-black " />
                  </div>
                  <span className="text-black font-bold text-xs">
                    {blog?.shares || 0}
                  </span>
                  <span className="text-[#868686] text-xs">Times Shared</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div
                    onClick={() => {
                      addLike(blog?.id);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F1F1F1] cursor-pointer hover:text-white hover:bg-[#8A38F5]"
                  >
                    <BiLike className="w-5 h-5 text-[10px]" />
                  </div>
                  <span className="text-black font-bold text-xs">
                    {blog?.likes || 0}
                  </span>
                  <span className="text-[#868686] text-xs">Likes</span>
                </div>
              </div>
            </div>
            {/* Blog Feedback */}
            <div className="w-full flex items-center justify-center pb-10">
              <BlogFeedback />
            </div>
          </div>

          <div className="hidden lg:flex w-[30%] flex-col gap-6 items-start justify-start">
            <div className="sideNavigation flex flex-col gap-8">
              <div
                onClick={() => {
                  navigate("/blogs");
                }}
                className="bg-white max-w-[400px] flex flex-col gap-5 py-10 px-8 text-black rounded-xl shadow-lg "
              >
                <h2 className="font-bold text-2xl">Search Blog</h2>
                <div className="w-full h-[50px] px-4 flex items-center gap-2 rounded-lg border border-[#8A38F5] text-[#868686]">
                  <IoSearch size={28} />
                  <span>Search Articles...</span>
                </div>
              </div>

              <div className="bg-[linear-gradient(90deg,#331A53_0%,#8A38F5_100%)] max-w-[400px] flex flex-col items-center justify-center rounded-[20px] gap-5 py-8 px-6 text-black shadow-[0px_1px_2px_0px_#0000004D]">
                <h2 className="text-[white] font-bold text-center text-2xl">
                  Become a Professional
                </h2>
                <p className="font-light text-sm text-[#FFFFFF] text-center">
                  Join Reparv’s Partner & Franchise program to grow your real
                  estate business.
                </p>
                <div className="w-full flex items-center justify-center">
                  <span
                    onClick={() => {
                      window.open("https://partners.reparv.in/", "_blank");
                    }}
                    className="w-[250px] flex items-center justify-center bg-[White] px-4 py-2 rounded-sm text-xl font-bold cursor-pointer active:scale-98"
                  >
                    Join Now
                  </span>
                </div>
              </div>
            </div>
            <div className="min-h-[1350px] max-h-[2700px] w-full overflow-y-auto scrollbar-hide">
              <div><AdvertisementCard variant="sidebar" /></div>
              <div className="w-full"><BlogFeatureProperties /></div>
            </div>
          </div>
        </div>
        <AdvertisementCard />
        <DreamHomeCTA />
        <FAQSection id={blog?.id} location={"Reparv Blog Details Page"} />
      </div>
    </>
  );
}

export default BlogDetails;
