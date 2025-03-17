import { FaHome } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="py-5 flex flex-col items-center max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5">
      <p className="text-[20px] font-bold text-secondary text-center my-5">
        Our Business Partners
      </p>
      {/* partners section */}
      <div className="flex flex-row flex-wrap items-center justify-evenly mb-10 w-full">
        <div className="m-2 cursor-pointer">
          <img
            src="./partner1.png"
            alt="partner1"
            className="h-24 w-24 sm:h-20 sm:w-20"
          />
        </div>
        <div className="m-2 cursor-pointer">
          <img
            src="./partner2.png"
            alt="partner2"
            className="h-24 w-24 sm:h-20 sm:w-20"
          />
        </div>
        <div className="m-2 cursor-pointer">
          <img
            src="./partner1.png"
            alt="partner1"
            className="h-24 w-24 sm:h-20 sm:w-20"
          />
        </div>
        <div className="m-2 cursor-pointer">
          <img
            src="./partner2.png"
            alt="partner4"
            className="h-24 w-24 sm:h-20 sm:w-20"
          />
        </div>
        <div className="m-2 cursor-pointer">
          <img
            src="./partner1.png"
            alt="partner3"
            className="h-24 w-24 sm:h-20 sm:w-20"
          />
        </div>
      </div>
      {/* the about part */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
        {/* first column */}
        <div className="relative rounded-xl flex flex-col items-start justify-center w-full lg:w-2/5 lg:px-5 p-3 bg-gray-100 hidden sm:block">
          {/* Image */}
          <img
            src="./about.jpeg"
            alt="about"
            className="w-full h-60 sm:h-80 lg:h-96 rounded-xl object-cover"
          />

          {/* Red Curved Border */}
          <div className="absolute -top-4 -right-4 h-40 w-40 border-t-8 border-r-8 border-primary rounded-tr-xl"></div>
        </div>

        {/* second column */}
        <div className="flex flex-col items-start justify-center w-full">
          <p className="flex items-center justify-center bg-primary/20 text-primary text-[14px] font-semibold px-3 gray-700ded-md">
            About Us
          </p>
          <h3 className="text-secondary text-left my-3 text-[30px] sm:text-[40px] font-bold">
            The Leading Real State Property Marketplace
          </h3>
          <p className="text-left text-gray-700 text-[14px] sm:text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis asperiores magni omnis voluptatum unde. Eaque,
            voluptatibus ut! Porro, illum voluptas cumque ex aperiam corporis
            incidunt esse, iusto deleniti sapiente delectus!
          </p>
          {/* the property section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full my-10">
            <div className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                <FaHome className="text-primary inline" />
              </span>
              <p className="text-[14px] font-semibold text-gray-700 inline pl-4">
                Smart home Design
              </p>
            </div>
            <div className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                <FaHome className="text-primary inline" />
              </span>
              <p className="text-[14px] font-semibold text-gray-700 inline pl-4">
                Beautiful Scenery Around
              </p>
            </div>
            <div className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                <FaHome className="text-primary inline" />
              </span>
              <p className="text-[14px] font-semibold text-gray-700 inline pl-4">
                Exceptional Lifestyle
              </p>
            </div>
            <div className="flex items-center">
              <span className="bg-primary/10 p-2 rounded-full flex items-center justify-center">
                <FaHome className="text-primary inline" />
              </span>
              <p className="text-[14px] font-semibold text-gray-700 inline pl-4">
                Complete 24/7 Security
              </p>
            </div>
          </div>
          {/* the button section */}
          <div className="flex items-center justify-center border border-primary rounded-md p-2 text-secondary font-semibold cursor-pointer hover:bg-primary hover:text-white transition">
            Learn more
          </div>
        </div>
      </div>
    </div>
  );
}
