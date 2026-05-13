import NavLink from "../NavLinkNext.jsx";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../store/auth";
import { motion } from "framer-motion";

export default function HomeImage() {
  const router = useRouter();
  const { user, setShowLogin } = useAuth();

  user;
  return (
    <div className="relative w-full mx-auto max-w-[1440px] flex flex-col items-center justify-center">
      {/* Background */}

      <motion.img
        src="/assets/home/HomeBack.webp"
        alt="Buy Properties in Pune | Reparv Real Estate"
        className="block w-full object-cover mb-[85vw] md:mb-30 lg:mb-40 xl:mb-50"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />

      {/* Cards */}
      <div className="absolute bottom-[0px] max-h-[750px] w-full max-w-[1380px] grid gap-2 grid-cols-2 md:grid-cols-4 px-4 md:px-8 2xl:px-0">
        {[
          {
            to: user ? "/sell-old-property" : "no",
            img: "/assets/home/HomeSellOldPropertyIcon.svg",
            alt: "Sell Old Property",
          },
          {
            to: user ? "/rent-property" : "no",
            img: "/assets/home/HomeRentPropertyIcon.svg",
            alt: "Rent Property",
          },
          {
            to: "/buy-new-property",
            img: "/assets/home/HomeBuyNewPropertyIcon.svg",
            alt: "Buy New Property",
          },
          {
            to: "/buy-resale-property",
            img: "/assets/home/HomeBuyResalePropertyIcon.svg",
            alt: "Buy Resale Property",
          },
        ].map((card, index) => (
          <NavLink
            key={index}
            href={card.to === "no" ? "#" : card.to}
            onClick={(e) => {
              e.preventDefault();
              if (card.to === "no") {
                setShowLogin(true);
              } else {
                router.push(card.to);
              }
            }}
          >
            <motion.img
              src={card.img}
              alt={card.alt}
              loading="lazy"
              className="w-full object-cover cursor-pointer"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
}
