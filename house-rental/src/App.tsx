// App.tsx
import React from "react";
import ServicesList from "./pages/services/services-page";
import Header from "./components/Common/header";
import ApartmentsList from "./pages/Apartments/apartments-page";
import HeroPage from "./pages/Hero/hero-section";

const App: React.FC = () => {
  return (
    // <div className="flex  flex-col max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 bg-white">
    <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
      <div className="sticky top-0 lg:pr-10 md:pr-1 sm:pr-10 pr-5 z-50">
        <Header />
      </div>
      <HeroPage />
      {/* <ApartmentsList /> */}
      <ServicesList />
    </div>
  );
};

export default App;
