import { useState } from "react";

export default function PropertySearch() {
  const [activeTab, setActiveTab] = useState("sell");

  return (
    <div className="mt-1 md:mt-0 p-4 shadow-sm border border-gray-300 rounded-lg flex flex-col items-start max-w-[1440px] mx-auto bg-white mb-3">
      <div className="flex items-start justify-start space-x-4 mb-4">
        <div
          className={`px-4 py-1 cursor-pointer transition-all duration-300 ${
            activeTab === "sell"
              ? "bg-primary text-white"
              : "bg-gray-100 text-secondary"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          For Sell
        </div>
        <div
          className={`px-4 py-1 cursor-pointer transition-all duration-300 ${
            activeTab === "rent"
              ? "bg-primary text-white"
              : "bg-gray-100 text-secondary"
          }`}
          onClick={() => setActiveTab("rent")}
        >
          For Rent
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 w-full text-gray-600">
        <select className="border border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base">
          <option>Choose Area</option>
          <option>Addis Ababa</option>
          <option>Adama</option>
          <option>Bahir Dar</option>
          <option>Hawassa</option>
        </select>
        <select className="border border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base">
          <option>Property Status</option>
          <option>New</option>
          <option>Used</option>
        </select>
        <select className="border p-0 border-gray-200 w-full sm:w-1/3 h-10 sm:h-8 transition-all duration-300 hover:border-primary text-sm sm:text-base">
          <option>Property Type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Villa</option>
          <option>Commercial</option>
        </select>
        <div className="px-6 w-full sm:w-max flex items-center justify-center cursor-pointer bg-primary text-white transition-all duration-300 hover:bg-primary-dark">
          Search
        </div>
      </div>
    </div>
  );
}
