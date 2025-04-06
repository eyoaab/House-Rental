import type { RootState, AppDispatch } from "../../state-managment/store";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";

function NavBar({ navItems = [] }) {
  const selectedIndex = useSelector(
    (state: RootState) => state.nav.selectedIndex
  );
  const dispatch = useDispatch<AppDispatch>();

  // const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const defaultItems = [
    { label: "Home", path: "/" },
    { label: "Properties", path: "/apartments" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Blog", path: "/news" },
  ];

  const items = navItems.length > 0 ? navItems : defaultItems;

  return (
    <nav className="w-max flex items-center  justify-between px-2 py-1 text-secondary ">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2 text-secondary">
        {items
          .filter((item, index) => {
            const token = localStorage.getItem("token");
            let isAdmin = false;
            try {
              const decodedToken = token
                ? JSON.parse(atob(token.split(".")[1]))
                : null;
              isAdmin = decodedToken.role === "admin";
            } catch (error) {
              console.error("Failed to decode token:", error);
            }
            if (item.label === "Admin") {
              return isAdmin;
            }
            return index < 5 || isAdmin;
          })
          .map((item, index) => (
            <Link key={index} to={item.path}>
              <div
                className={cn(
                  " text-md font-medium border-none transition-all duration-300 rounded-md px-3 py-1 cursor-pointer",
                  selectedIndex === index
                    ? "bg-primary text-white border-none "
                    : "hover:bg-white/5  text-secondary hover:text-primary"
                )}
                onClick={() => dispatch(setSelectedIndex(index))}
              >
                {item.label}
              </div>
            </Link>
          ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div className="hover:bg-white/10 text-primary">
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
              <span className="sr-only text-secondary">Menu</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-gray-900/70 backdrop-blur-sm text-white border border-gray-700/50 min-w-[170px] mr-2"
            align="end"
          >
            {items
              .filter((item, index) => {
                const token = localStorage.getItem("token");
                let isAdmin = false;
                try {
                  const decodedToken = token
                    ? JSON.parse(atob(token.split(".")[1]))
                    : null;
                  isAdmin = decodedToken.role === "admin";
                } catch (error) {
                  console.error("Failed to decode token:", error);
                }
                if (item.label === "Admin") {
                  return isAdmin;
                }
                return index < 5 || isAdmin;
              })
              .map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className={cn(
                    "focus:bg-white/20 focus:text-white",
                    selectedIndex === index ? "bg-primary text-white" : ""
                  )}
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsOpen(false);
                  }}
                >
                  <Link
                    to={item.path}
                    className="w-full py-1 font-medium text-gray-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default NavBar;
