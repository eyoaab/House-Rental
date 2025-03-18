// App.tsx
import React from "react";
import ServicesList from "./pages/services/services-page";
import Header from "./components/Common/header";
import ApartmentsList from "./pages/Apartments/apartments-page";
import HeroPage from "./pages/Hero/hero-section";
import PropertySearch from "./components/Common/search-drop-down";
import AboutPage from "./pages/About/about-page";
import Footer from "./components/Common/footer";
import TestimonyList from "./pages/Testimonials/testimonials-page";
import NewsPage from "./pages/News/news-page";
import RecomenedApartments from "./components/Apartments/recomended-apartments";
import SignUpPage from "./pages/Authentication/signup-page";
import LoginPage from "./pages/Authentication/login-page";
const App: React.FC = () => {
  return (
    <div>
      <SignUpPage />
    </div>
    // <div className="flex  flex-col max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 bg-white">
    // <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
    /* <div className="sticky top-0 lg:pr-10 md:pr-1 sm:pr-10 pr-5 z-50">
        <Header />
      </div>
      <HeroPage />
      <PropertySearch />
      <AboutPage />
      <RecomenedApartments />
      <ServicesList />
      <TestimonyList />
      <NewsPage />
      <Footer /> */
    /* </div> */
  );
};

export default App;
