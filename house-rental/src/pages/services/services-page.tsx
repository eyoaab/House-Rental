import { ServiceCard } from "../../components/services/card";
import { Service } from "../../types/service-type";

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
    <div className="p-5 max-w-[1440px] mx-auto min-h-screen flex items-center justify-center flex-col">
      <p className="text-4xl font-semibold text-center text-secondary">
        Our Services
      </p>
      <p className="text-center text-secondary mt-2 max-auto w-[90%] md:w-[70%] lg:w-[60%]">
        Choose from our wide range of services Choose from our wide range of
        services Choose from our wide range of services Choose from our wide
        range of services Choose from our wide range of services Choose from our
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: Service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
