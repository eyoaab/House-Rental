import React from "react";
import HeroPage from "@/pages/Hero/hero-section";
import RecomenedApartments from "@/components/Apartments/recomended-apartments";
import TestimonyList from "@/pages/Testimonials/testimonials-page";
import NewsPage from "@/pages/News/news-page";
import { useState } from "react";
import PropertySearch from "@/components/Common/search-drop-down";
const App: React.FC = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCatagory, setSelectedcatagory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isFor, setIsFor] = useState("");

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };
  const handleCatagorySelect = (category: string) => {
    setSelectedcatagory(category);
  };

  return (
    <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
      <HeroPage />

      <PropertySearch
        isFromHomePage={true}
        selectedLocation={selectedLocation}
        selectedCatagory={selectedCatagory}
        selectedType={selectedType}
        onTypeSelect={handleTypeSelect}
        onLocationSelect={handleLocationSelect}
        onCatagorySelect={handleCatagorySelect}
        isFor={isFor}
        onIsFor={setIsFor}
      />
      {/* <AboutPage /> */}
      <RecomenedApartments />
      {/* <ServicesList /> */}
      <TestimonyList />
      <NewsPage />
    </div>
  );
};

export default App;
