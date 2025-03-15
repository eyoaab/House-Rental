// App.tsx
import React from "react";
import ServicesList from "./pages/services/services-page";
import AppartmentList from "./pages/Apartments/apartments-page";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col w-screen lg:px-20 md:px-15 sm:px-10 px-5 bg-white">
      <AppartmentList />
      <ServicesList />
    </div>
  );
};

export default App;
