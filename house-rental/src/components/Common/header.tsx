// import NavBar from "./nav-bar";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../state-managment/store";
// import { logout } from "@/state-managment/slices/user-slice";

// export default function Header() {
//   const { user } = useSelector((state: RootState) => state.user);
//   // use navigation
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const token = localStorage.getItem("token");
//   //from the token extract the userid
//   let userName = null;
//   if (token) {
//     console.log("theris a token");
//     userName = token ? JSON.parse(atob(token.split(".")[1])).username : null;
//     console.log(userName);
//   }
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <header className="z-90 md:px-20 px-5 max-w-[1440px] mx-auto flex justify-between items-center p-4">
//       <div className="flex items-center space-x-4 justify-between w-full">
//         <a href="#">
//           <img
//             src="/logo.jpeg"
//             alt="logo"
//             className="lg:block hidden w-16 h-16 rounded-full mb-4 sm:mb-0"
//           />
//         </a>
//         <NavBar />
//         {user?.username || userName ? (
//           <div className="flex items-center space-x-4">
//             <div>
//               <div className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer transition duration-300">
//                 {user?.username || userName}
//               </div>
//             </div>
//             <div>
//               <div
//                 onClick={handleLogout}
//                 className="bg-white text-secondary px-3 py-1 rounded-md cursor-pointer border border-primary transition duration-300"
//               >
//                 Logout
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Link to="/login">
//             <div className="bg-white cursor-pointer border border-primary text-secondary px-3 py-1 rounded-md transition duration-300">
//               Login
//             </div>
//           </Link>
//         )}
//       </div>
//     </header>
//   );
// }

// Header.jsx
import NavBar from "./nav-bar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state-managment/store";
import { logout } from "@/state-managment/slices/user-slice";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({ logoSrc = "/logo.jpeg", navItems = [] }) {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const userName = token
    ? JSON.parse(atob(token.split(".")[1])).username
    : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg shadow-sm shadow-gray-800/50 py-2">
      <div className="max-w-[1440px] mx-auto  px-2 sm:px-0 lg:px-8 lg:py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="hidden sm:flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={logoSrc} alt="Logo" />
              <AvatarFallback>
                {user?.username?.[0] || userName?.[0] || ""}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Navigation */}
          <div className="flex-1 lg:mx-8">
            <NavBar navItems={navItems} />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user?.username || userName ? (
              <>
                <div className="hidden md:block text-black border-white/20">
                  {user?.username || userName}
                </div>
                <div
                  onClick={handleLogout}
                  className="py-1 px-2 cursor-pointer rounded-md bg-primary hover:text-white border border-gray"
                >
                  Logout
                </div>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-gray-500 text-white border-white/20 hover:bg-primary"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
