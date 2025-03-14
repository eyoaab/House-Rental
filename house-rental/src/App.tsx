// App.tsx
import React from "react";
import ApartmentsList from "./pages/Apartments/apartments-page";

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col w-screen bg-white">
      <ApartmentsList />
    </div>
  );
};

export default App;
