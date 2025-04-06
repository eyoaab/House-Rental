import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Home, Bed, Bath, Ruler } from "lucide-react";
import type { Apartment } from "../../types/apartment-type";

interface ApartmentCardProps {
  apartment: Apartment;
  onViewDetails: (apartment: Apartment) => void;
}

export const ApartmentCard = ({
  apartment,
  onViewDetails,
}: ApartmentCardProps) => {
  return (
    <Card
      onClick={() => onViewDetails(apartment)}
      className="group overflow-hidden transition-all shadow-md duration-300 hover:shadow-xl p-4 flex flex-col h-full rounded-lg cursor-pointer border border-gray-200 bg-white"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-md">
        <img
          // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnakZlnxxgnoWPcILVLnvcfnct7DSJ8yBYBQ&s"
          src={
            apartment.imageUrl && apartment.imageUrl.trim() !== ""
              ? apartment.imageUrl
              : "./placeholder.png"
          }
          alt={apartment.title}
          className="w-full h-48 object-cover transition-transform duration-500 rounded-md"
        />
        <Badge className="absolute top-2 left-2 bg-primary text-white px-3 py-1 rounded-md drop-shadow-lg">
          For {apartment.status}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Header Section */}
      <CardHeader className="pb-3 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-800">
          {apartment.title}
        </CardTitle>
        <span className="text-lg font-bold text-primary">
          ${apartment.price}
        </span>
      </CardHeader>

      {/* Apartment Details */}
      <CardContent>
        <div className="flex flex-col items-start space-y-3">
          <div className="flex items-center text-secondary gap-2">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-sm">{apartment.description}</span>
          </div>

          <div className="flex items-center justify-around text-gray-700 mt-2 w-full text-sm font-medium">
            <div className="flex flex-col items-center gap-1 border-r pr-5 border-gray-300">
              <div className="flex gap-1 items-center">
                <Bed className="h-5 w-5 text-secondary" />
                <p>{apartment.noRoom}</p>
              </div>
              <p className="text-xs text-secondary font-semibold">Bedrooms</p>
            </div>

            <div className="flex flex-col items-center gap-1 border-r pr-5 border-gray-300">
              <div className="flex gap-1 items-center">
                <Ruler className="h-5 w-5 text-secondary" />
                <p>{apartment.area ?? 0}</p>
              </div>
              <p className="text-xs text-secondary font-semibold">Square Ft</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1 items-center">
                <Bath className="h-5 w-5 text-secondary" />
                <p>{apartment.noBathRoom ?? 0}</p>
              </div>
              <p className="text-xs text-secondary font-semibold">Bathroom</p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Spacer for Flex Growth */}
      <div className="flex-grow"></div>
    </Card>
  );
};
