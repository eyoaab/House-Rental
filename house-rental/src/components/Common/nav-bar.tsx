function NavBar() {
  return (
    <nav className="text-sm flex justify-between items-center z-[100] bg-white text-secondary p-2 shadow-md shadow-gray-200 rounded-md border border-gray-50">
      <p className="text-md font-semibold px-4 py-1 bg-primary/10 rounded-md text-primary">
        Home
      </p>
      <p className="text-md font-semibold px-4 py-1 bg-white ">Services</p>
      <p className="text-md font-semibold px-4 py-1 bg-white z-[90]">
        Contact Us
      </p>
      <p className="text-md font-semibold px-4 py-1">Property</p>
    </nav>
  );
}

export default NavBar;
