function NavBar() {
  return (
    <nav className="text-sm flex justify-between items-center bg-white text-secondary py-2 px-10 shadow-2xl rounded-md">
      <p className="text-md font-semibold px-4 py-1 bg-primary/10 rounded-md text-primary">
        Home
      </p>
      <p className="text-md font-semibold px-4 py-1 ">Services</p>
      <p className="text-md font-semibold px-4 py-1">Contact Us</p>
      <p className="text-md font-semibold px-4 py-1">Property</p>
    </nav>
  );
}

export default NavBar;
