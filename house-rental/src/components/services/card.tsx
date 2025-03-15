import { Card, CardContent } from "../ui/card";
import { ArrowRight } from "lucide-react";
import type { Service } from "../../types/service-type";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden flex flex-col items-center shadow-none h-full rounded-lg cursor-pointer text-secondary border-none">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-md w-full">
        <img
          src={`${service.imageUrl}`}
          alt={service.title}
          className="w-full h-48 object-contain z-40"
        />
      </div>

      {/* Apartment Details */}
      <CardContent className="flex flex-col items-center justify-evenly space-y-3 mt-4">
        <h2 className="text-lg font-semibold">{service.title}</h2>
        <p className="text-center text-[14px] text-gray-700">
          {service.description}
        </p>

        {/* Spacer for Flex Growth */}
        <div className="flex-grow"></div>

        <div className="flex items-center p-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300">
          Learn More <ArrowRight size={24} className=" ml-2 rotate-320" />
        </div>
      </CardContent>
    </Card>
  );
};
