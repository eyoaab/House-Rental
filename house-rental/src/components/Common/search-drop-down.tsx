import { useState } from "react";

export default function PropertySearch({
  onTypeSelect,
  onLocationSelect,
  onCatagorySelect,
}: {
  onTypeSelect: (type: string) => void;
  onLocationSelect: (location: string) => void;
  onCatagorySelect: (category: string) => void;
}) {
  const [activeType, setActiveType] = useState("");

  return (
    <div className="mt-1 md:mt-0 p-4 shadow-sm border border-gray-300 rounded-lg flex flex-col items-start max-w-[1440px] mx-auto bg-white mb-3">
      <div className="flex items-start justify-start space-x-4 mb-4">
        <div
          className={`px-4 py-1 cursor-pointer transition-all duration-300 ${
            activeType === "sell"
              ? "bg-primary text-white"
              : "bg-gray-100 text-secondary"
          }`}
          onClick={() => {
            setActiveType("sell");
            onTypeSelect("sell");
          }}
        >
          For Sell
        </div>
        <div
          className={`px-4 py-1 cursor-pointer transition-all duration-300 ${
            activeType === "rent"
              ? "bg-primary text-white"
              : "bg-gray-100 text-secondary"
          }`}
          onClick={() => {
            setActiveType("rent");
            onTypeSelect("rent");
          }}
        >
          For Rent
        </div>
      </div>
      {/* <select
        className="border border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base"
        onChange={(e) => onLocationSelect(e.target.value)}
      ></select> */}
      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 w-full text-gray-600">
        {/* for selecting a place */}
        <select
          className="border border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base"
          onChange={(e) => onLocationSelect(e.target.value)}
        >
          <option>Location</option>
          <option>Addis Ababa</option>
          <option>Adama</option>
          <option>Bahir Dar</option>
          <option>Hawassa</option>
          <option>Jimma</option>
          <option>Mekele</option>
        </select>
        <select
          className="border p-0 border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base"
          onChange={(e) => onCatagorySelect(e.target.value)}
        >
          <option>Property Type</option>
          <option>Office</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Penthouse</option>
        </select>

        <div
          onClick={() => {
            setActiveType("");
            onTypeSelect("");
            onLocationSelect("");
            onCatagorySelect("");
          }}
          className="px-6 w-full sm:w-max flex items-center justify-center cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-primary-dark"
        >
          Reset
        </div>
      </div>
    </div>
  );
}
