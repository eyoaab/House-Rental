import { JSX } from "react";
import { FaHome } from "react-icons/fa";

export default function HeroPage(): JSX.Element {
  return (
    <div className="max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 text-secondary md:flex md:items-center md:justify-between">
      {/* first column */}
      <div className="order-2 md:order-1 flex flex-col items-start space-y-4 md:w-1/2">
        <div className="flex items-center space-x-2">
          <FaHome className="text-primary text-2xl" />
          <p className="text-[14px] text-primary font-semibold">
            Property Listing Website
          </p>
        </div>
        <h1 className="text-[14px] font-semibold text-secondary leading-tight">
          FIND YOUR DREAM HOME WITH US
        </h1>
        <div className="border-l-2 border-primary pl-4">
          <p className="text-[16px] text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, rerum
            voluptate. Nam ad corporis rem id similique vitae aspernatur quam
            nesciunt, eos.
          </p>
        </div>
        <div className="bg-primary text-white px-5 py-2 rounded-lg mt-5 cursor-pointer hover:bg-primary-dark transition">
          <p>Find your home</p>
        </div>
      </div>
      {/* second column */}
      <div className="order-1 md:order-2 mt-4 md:mt-0 md:w-1/2">
        <img src="./heroImg.png" alt="Hero" className="w-full h-auto" />
      </div>
    </div>
  );
}
