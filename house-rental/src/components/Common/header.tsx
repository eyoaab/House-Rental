import NavBar from "./nav-bar";

export default function Header() {
  return (
    <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4">
      {/* add an image as a logo */}
      <img
        src="/profile.jpeg"
        alt="logo"
        className="w-16 h-16 rounded-full mb-4 sm:mb-0"
      />
      <NavBar />
      <div className="flex space-x-4 mt-4 sm:mt-0">
        <div className="cursor-pointer border border-secondary text-secondary px-3 py-1 rounded-md transition duration-300">
          Login
        </div>
        <div className="cursor-pointer bg-primary text-white px-3 py-1 rounded-md transition duration-300">
          Sign Up
        </div>
      </div>
    </header>
  );
}
