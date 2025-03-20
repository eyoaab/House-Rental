import NavBar from "./nav-bar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state-managment/store";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <header className="z-90 md:px-20 px-5 max-w-[1440px] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center space-x-4 justify-between w-full">
        <img
          src="/profile.jpeg"
          alt="logo"
          className="lg:block hidden w-16 h-16 rounded-full mb-4 sm:mb-0"
        />
        <NavBar />
        {user ? (
          <div className="flex items-center space-x-4">
            <div>
              <div className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer transition duration-300">
                {user.username}
              </div>
            </div>
            <div>
              <div className="bg-white text-secondary px-3 py-1 rounded-md cursor-pointer border border-primary transition duration-300">
                Logout
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="bg-white cursor-pointer border border-primary text-secondary px-3 py-1 rounded-md transition duration-300">
              Login
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
