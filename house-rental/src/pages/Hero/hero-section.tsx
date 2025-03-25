import { JSX, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import type { AppDispatch } from "../../state-managment/store";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { useDispatch } from "react-redux";

export default function HeroPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setSelectedIndex(0));
  }, [dispatch]);
  return (
    <div
      id="/"
      className="max-w-[1440px] pt-20 mx-auto lg:px-20 md:px-15 sm:px-10 px-5 text-secondary md:flex md:items-center md:justify-between"
    >
      {/* first column */}
      <div className="order-2 md:order-1 flex flex-col items-start space-y-4 md:w-1/2">
        <div className="flex items-center space-x-2">
          <FaHome className="text-primary text-2xl" />
          <p className="text-[14px] text-primary font-semibold">
            Property Listing Website
          </p>
        </div>
        <h1 className="text-[14px] md:text-[18px] lg:text-[24px] font-semibold text-secondary leading-tight">
          FIND YOUR DREAM HOME WITH US
        </h1>
        <div className="border-l-2 border-primary pl-4">
          <p className="text-[16px] text-gray-700">
            Discover the best properties for sale and rent. Your dream home is
            just a click away with our trusted listings and expert guidance.
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
