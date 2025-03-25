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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm shadow-gray-800/50 py-2">
      <div className="max-w-[1440px] mx-auto  px-2 sm:px-3 lg:px-8 lg:py-2">
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
