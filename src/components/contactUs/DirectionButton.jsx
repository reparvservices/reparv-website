import { FaDirections } from "react-icons/fa";

function DirectionButton({ latitude, longitude }) {
  const handleDirection = () => {
    if (!latitude || !longitude) {
      alert("Location not available");
      return;
    }

    // Open Google Maps Directions (from current location to property location)
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank"); // open in new tab
  };

  return (
    <button
      onClick={handleDirection}
      className="w-full mt-3 bg-[#0BB501] text-white py-3 rounded-lg hover:bg-[#25b501] active:scale-95 cursor-pointer"
    >
      Get Direction
    </button>
  );
}

export default DirectionButton;
