import { useAuth } from "../../store/auth";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { getImageURI } from "../../utils/helper";

function BrochureAndVideo({ brochureFile, videoLink }) {
  const { URI, setVideoURL, setShowPlayVideo } = useAuth();

  return (
    <div className={`flex gap-[8px] items-center justidy-center`}>
      <div
        onClick={() => {
          //window.open(URI + property?.videoFile, "_blank");
          setVideoURL(videoLink);
          setShowPlayVideo(true);
        }}
        className={`${
          videoLink ? "block" : "hidden"
        } relative overflow-hidden z-10 text-white bg-[#8A38F5] rounded-lg cursor-pointer`}
      >
        <div className="overflow-hidden relative z-10 flex items-center justify-center p-[5px] animate-blink">
          <MdOutlinePlayCircleOutline className="w-5 h-5" />
          <span className="absolute shine-layer"></span>
        </div>
      </div>
      <div
        onClick={() => {
          if (!brochureFile) return;

          const link = document.createElement("a");
          link.href = getImageURI(brochureFile);
          link.download = brochureFile.split("/").pop() || "brochure";
          link.rel = "noopener";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className={`${
          brochureFile ? "block" : "hidden"
        } text-white bg-[#8A38F5] rounded-lg cursor-pointer relative overflow-hidden`}
      >
        <div className="relative z-10 flex items-center justify-center gap-2 p-[5px] sm:px-2 animate-blink overflow-hidden">
          <MdOutlineFileDownload className="w-5 h-5" />

          <span className="hidden lg:block font-bold text-[13px] pr-1">
            Download Brochure
          </span>

          {/* Shine effect */}
          <span className="absolute shine-layer" />
        </div>
      </div>
    </div>
  );
}

export default BrochureAndVideo;
