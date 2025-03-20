import React from "react";
import Header from "@/components/Common/header";
import Footer from "@/components/Common/footer";
import HeroPage from "@/pages/Hero/hero-section";
import AboutPage from "@/pages/About/about-page";
import RecomenedApartments from "@/components/Apartments/recomended-apartments";
import ServicesList from "@/pages/services/services-page";
import TestimonyList from "@/pages/Testimonials/testimonials-page";
import NewsPage from "@/pages/News/news-page";
const App: React.FC = () => {
  return (
    <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
      <div className="sticky top-0 lg:pr-10 md:pr-1 sm:pr-10 pr-5 z-50">
        <Header />
      </div>
      <HeroPage />
      {/* <PropertySearch /> */}
      <AboutPage />
      <RecomenedApartments />
      <ServicesList />
      <TestimonyList />
      <NewsPage />
      <Footer />
    </div>
  );
};

export default App;
