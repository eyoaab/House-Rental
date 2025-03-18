import NavBar from "./nav-bar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="z-90 px-20 max-w-[1440px] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center space-x-4 justify-between w-full">
        <img
          src="/profile.jpeg"
          alt="logo"
          className="w-16 h-16 rounded-full mb-4 sm:mb-0"
        />
        <NavBar />
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <Link to="/login">
            <div className="bg-white cursor-pointer border border-secondary text-secondary px-3 py-1 rounded-md transition duration-300">
              Login
            </div>
          </Link>
          <Link to="/signup">
            <div className="cursor-pointer bg-primary text-white px-3 py-1 rounded-md transition duration-300">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
