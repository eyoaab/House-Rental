import React from "react";
import HeroPage from "@/pages/Hero/hero-section";
import AboutPage from "@/pages/About/about-page";
import RecomenedApartments from "@/components/Apartments/recomended-apartments";
import ServicesList from "@/pages/services/services-page";
import TestimonyList from "@/pages/Testimonials/testimonials-page";
import NewsPage from "@/pages/News/news-page";
const App: React.FC = () => {
  return (
    <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
      <HeroPage />
      {/* <PropertySearch /> */}
      <AboutPage />
      <RecomenedApartments />
      <ServicesList />
      <TestimonyList />
      <NewsPage />
    </div>
  );
};

export default App;
