// import { useState } from "react";
// // import { div } from "@/components/ui/div";
// import { Link } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// function NavBar() {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const menuItems = ["Home", "Property", "Services", "Blogs"];
//   const Links = ["/", "/apartments", "/services", "/news"];

//   return (
//     <nav className="text-sm flex justify-between items-center z-[100] bg-black/50 text-white p-2 shadow-md shadow-gray-200 rounded-md border border-gray-50 md:bg-white md:text-secondary">
//       <div className="hidden md:flex space-x-4">
//         {menuItems.map((item, index) => (
//           <Link to={Links[index]}>
//             <p
//               key={index}
//               className={`text-md font-semibold px-4 py-1 cursor-pointer ${
//                 selectedIndex === index
//                   ? "bg-primary/10 rounded-md text-primary"
//                   : "bg-transparent"
//               }`}
//               onClick={() => setSelectedIndex(index)}
//             >
//               {item}
//             </p>
//           </Link>
//         ))}
//       </div>
//       <div className="md:hidden">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-white">
//               <span className="sr-only">Open menu</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className="bg-black/50 text-white">
//             {menuItems.map((item, index) => (
//               <DropdownMenuItem
//                 key={index}
//                 onClick={() => setSelectedIndex(index)}
//               >
//                 <Link to={Links[index]}>
//                   <p
//                     className={`text-md font-semibold px-4 py-1 cursor-pointer ${
//                       selectedIndex === index
//                         ? "bg-primary/10 rounded-md text-primary"
//                         : "bg-transparent"
//                     }`}
//                   >
//                     {item}
//                   </p>
//                 </Link>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
// NavBar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

function NavBar({ navItems = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
        {items.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              // variant={selectedIndex === index ? "default" : "ghost"}
              className={cn(
                "text-md font-medium border-none transition-all duration-200 rounded-md px-3 py-1 cursor-pointer",
                selectedIndex === index
                  ? "bg-primary text-white border-none"
                  : "hover:bg-white/5 text-secondary hover:text-primary"
              )}
              onClick={() => setSelectedIndex(index)}
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
              <span className="sr-only">Menu</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-gray-900/70 backdrop-blur-sm text-white border border-gray-700/50 min-w-[200px] mr-2"
            align="end"
          >
            {items.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="focus:bg-white/20 focus:text-white"
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
