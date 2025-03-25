import { ServiceCard } from "../../components/services/card";
import { Service } from "../../types/service-type";
import { Home } from "lucide-react";
import type { AppDispatch } from "../../state-managment/store";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ServicesList = () => {
  const services: Service[] = [
    {
      title: "Buy A New Home",
      description:
        "Discover your dream home with ease. Browse through a wide range of properties tailored to your preferences and budget, and let us help you make the buying process seamless and stress-free.",
      imageUrl: "/image1.jpeg",
    },
    {
      title: "Sell A Home",
      description:
        "Reach potential buyers quickly and efficiently. Our platform provides the tools and exposure you need to showcase your property and close deals faster.",
      imageUrl: "/image2.jpeg",
    },
    {
      title: "Rent A Home",
      description:
        "Find the perfect rental property that suits your lifestyle and budget. Whether you're looking for a cozy apartment or a spacious house, we make renting simple and hassle-free.",
      imageUrl: "/image4.jpeg",
    },
  ];
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setSelectedIndex(3));
  }, [dispatch]);
  return (
    <div
      id="services"
      className="scrollbar-hidden p-5 py-20 max-w-[1440px] mx-auto min-h-screen flex items-center justify-center flex-col overflow-x-clip relative"
    >
      <p className="text-4xl font-semibold text-center text-secondary">
        Our Services
      </p>
      <p className="text-center text-gray-700 mt-2 max-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
        Our platform connects buyers, sellers, landlords, and renters, making it
        easy to find your perfect match in the real estate market.
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
        Discover why we stand out in the real estate market. Our commitment to
        quality, innovation, and customer satisfaction sets us apart.
      </p>
      <div className="max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 flex flex-col gap-8 md:flex-row justify-between items-center mt-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-sm">
          <div className="space-y-8">
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center gap-2 z-10">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Seamless Connections
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                We specialize in connecting buyers and sellers effortlessly. Our
                platform ensures a smooth and efficient process, making real
                estate transactions hassle-free.
              </p>
            </div>

            <div className="flex flex-col items-start space-y-2 z-10">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Trusted Brokerage
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                We act as a reliable bridge between property owners and clients,
                ensuring smooth and transparent transactions. Our expertise in
                the Ethiopian real estate market guarantees satisfaction for all
                parties involved.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-2 z-10">
              <div className="flex items-center gap-2">
                <Home className="text-primary text-lg" />
                <h3 className="text-lg font-semibold text-secondary">
                  Legal Organization
                </h3>
              </div>
              <p className="text-secondary w-[80%]">
                We are a fully licensed and tax-compliant organization, ensuring
                transparency and adherence to all legal requirements in the real
                estate industry.
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
