import { useState } from "react";
// import { div } from "@/components/ui/div";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavBar() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuItems = ["About", "Property", "Services", "Blogs"];
  const Links = ["#about", "#property", "#services", "#blogs"];

  return (
    <nav className="text-sm flex justify-between items-center z-[100] bg-black/50 text-white p-2 shadow-md shadow-gray-200 rounded-md border border-gray-50 md:bg-white md:text-secondary">
      <div className="hidden md:flex space-x-4">
        {menuItems.map((item, index) => (
          <a href={Links[index]}>
            <p
              key={index}
              className={`text-md font-semibold px-4 py-1 cursor-pointer ${
                selectedIndex === index
                  ? "bg-primary/10 rounded-md text-primary"
                  : "bg-transparent"
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {item}
            </p>
          </a>
        ))}
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black/50 text-white">
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setSelectedIndex(index)}
              >
                <a href={Links[index]}>
                  <p
                    className={`text-md font-semibold px-4 py-1 cursor-pointer ${
                      selectedIndex === index
                        ? "bg-primary/10 rounded-md text-primary"
                        : "bg-transparent"
                    }`}
                  >
                    {item}
                  </p>
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default NavBar;
