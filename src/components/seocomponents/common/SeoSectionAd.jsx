import AdvertisementCard from "../../AdvertisementCard";

export default function SeoSectionAd({ variant = "seoDisplay" }) {
  return (
    <div className="max-w-[1380px] mx-auto my-5 px-4 sm:px-6">
      <AdvertisementCard variant={variant} />
    </div>
  );
}
