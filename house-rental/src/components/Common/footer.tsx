import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-secondary py-10 max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-2 rounded-full flex items-center justify-center w-10 h-10">
                <span className="text-white text-xl font-bold">H</span>
              </div>
              <span className="text-lg font-semibold">Homeist</span>
            </div>
            <p className="text-sm text-gray-700">
              Homeist connects you with rental properties that fit your needs
              and lifestyle.
            </p>
            <p className="text-sm text-gray-700 mt-2">Adama,Ethiopia</p>
            <p className="text-sm text-gray-700">eyobtariku48@gmail.com</p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Explore</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Buy</li>
              <li>Rent</li>
              <li>Short Term</li>
              <li>New Project</li>
              <li>List Your Property</li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Service</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Property Management</li>
              <li>Property Valuation</li>
              <li>Property Exchange</li>
              <li>Legal Agreements</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#property">Properties</a>
              </li>
              <li>
                <a href="#blogs">News</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#testimonies">Testimonies</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          <p>Copyright &copy; AA Homeist</p>
          <div className="flex space-x-4 text-pribg-primary text-lg  ">
            <FaFacebookF className="hover:text-primary" />
            <FaLinkedinIn className="hover:text-primary" />
            <FaInstagram className="hover:text-primary" />
            <FaYoutube className="hover:text-primary" />
          </div>
          <p>eyobtariku48@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
