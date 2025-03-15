import { useState } from "react";

function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = ["Home", "Services", "Contact Us", "Property"];

  return (
    <nav className="text-sm flex justify-between items-center z-[100] bg-white text-secondary p-2 shadow-md shadow-gray-200 rounded-md border border-gray-50">
      {menuItems.map((item, index) => (
        <p
          key={index}
          className={`text-md font-semibold px-4 py-1 cursor-pointer ${
            selectedIndex === index
              ? "bg-primary/10 rounded-md text-primary"
              : "bg-white"
          }`}
          onClick={() => setSelectedIndex(index)}
        >
          {item}
        </p>
      ))}
    </nav>
  );
}

export default NavBar;
