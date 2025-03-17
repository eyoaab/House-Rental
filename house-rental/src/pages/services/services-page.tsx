import { ServiceCard } from "../../components/services/card";
import { Service } from "../../types/service-type";
import { Home } from "lucide-react";

const ServicesList = () => {
  const services: Service[] = [
    {
      title: "Buy A New Home",
      description:
        "This is a description This is a descriptionThis is a description This is a description This is a description This is a description This is a description This is a description",
      imageUrl: "/image1.jpeg",
    },
    {
      title: "Sell A Home",
      description:
        "This is a description This is a descriptionThis is a description This is a description This is a description This is a description This is a description This is a description",

      imageUrl: "/image2.jpeg",
    },
    {
      title: "Rent A Home",
      description:
        "This is a description This is a descriptionThis is a description This is a description This is a description This is a description This is a description This is a description",
      imageUrl: "/image4.jpeg",
    },
  ];
  return (
    <div className="scrollbar-hidden p-5 max-w-[1440px] mx-auto min-h-screen flex items-center justify-center flex-col overflow-x-clip relative">
      <p className="text-4xl font-semibold text-center text-secondary">
        Our Services
      </p>
      <p className="text-center text-gray-700 mt-2 max-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
        Choose from our wide range of services Choose from our wide range of
        services Choose from our wide range of services Choose from our wide
        range of services Choose from our wide range of services Choose from our
      </p>

      <div className="max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: Service) => (
          <ServiceCard service={service} />
        ))}
      </div>
      <p className="text-4xl font-semibold text-center text-secondary mt-8 z-10">
        Why Choose Us
      </p>
      <p className="text-center mt-4 md:w-[40%] lg:w-[40%] z-10 text-gray-700 text-[16px]">
        Choose from our wide range of services. We offer a variety of options to
        suit your needs.
      </p>
      <div className="max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 flex flex-col gap-8 md:flex-row justify-between items-center mt-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-sm">
          <div className="space-y-8">
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2 z-10">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Smart Home Design
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="flex flex-col items-start space-y-2 z-10">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Energy Efficient
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>

            <div className="flex flex-col items-start space-y-2 z-10">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Modern Amenities
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                Lorem ipsum dolor sit amet consectetur. Convallis neque ut
                tellus suscipit leo at. Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full hidden md:w-1/2 md:flex justify-start z-10">
          <img
            src="/image4.png"
            alt="Modern Home"
            className="w-full max-w-md rounded-lg"
          />
        </div>
      </div>
      <div className="w-[90%] h-[400px] bg-primary rounded-full -rotate-30 absolute bottom-60 left-[650px]"></div>
    </div>
  );
};

export default ServicesList;
