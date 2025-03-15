// App.tsx
import React from "react";
import ServicesList from "./pages/services/services-page";
import WhyChooseUs from "./pages/WhyToChooseUs/why-to-choose-us-page";
import Header from "./components/Common/header";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col w-screen lg:px-20 md:px-15 sm:px-10 px-5 bg-white">
      <div className="sticky top-0 w-screen lg:pr-10 md:pr-1 sm:pr-10 pr-5">
        <Header />
      </div>
      <WhyChooseUs />
      <ServicesList />
    </div>
  );
};

export default App;
