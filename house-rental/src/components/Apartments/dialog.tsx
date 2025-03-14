"use client";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Calendar, DollarSign, Home, MapPin } from "lucide-react";
import type { Apartment } from "../../types/apartment-type";

interface ApartmentDetailsDialogProps {
  apartment: Apartment;
  isOpen: boolean;
  onClose: () => void;
}

export const ApartmentDetailsDialog = ({
  apartment,
  isOpen,
  onClose,
}: ApartmentDetailsDialogProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "rented":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto py-4 bg-white text-black w-full sm:w-auto overflow-x-hidden">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold text-start">
                {apartment.title}
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 text-green-400" />
                {apartment.location}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={"./placeholder.png"}
              alt={apartment.title}
              className="w-full h-[180px] sm:h-[280px] object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className={`${getStatusColor(apartment.status)}`}>
                {apartment.status}
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground text-start">
              {apartment.description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-900 rounded-full">
                  <Home className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Rooms
                  </h3>
                  <p className="font-semibold text-md">{apartment.noRoom}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-900 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Price
                  </h3>
                  <p className="font-semibold text-md">{apartment.price}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start justify-start gap-2">
                <div className="p-2 bg-gray-900 rounded-full">
                  <Calendar className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Available From
                  </h3>
                  <p className="font-semibold text-md">
                    {apartment.availableFrom.slice(0, 10)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-900 rounded-full">
                  <Calendar className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Available To
                  </h3>
                  <p className="font-semibold text-md">
                    {apartment.availableFrom.slice(0, 10)}
                    {/* {apartment.availableTo.slice(0, 10)} */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-md font-medium mb-2">Property Features</h3>
          <div className="flex flex-wrap gap-2">
            {apartment.features.map((feature) => (
              <Badge key={feature} className="bg-blue-100 text-green-800">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-6 ">
          <Button
            variant="outline"
            onClick={onClose}
            className="sm:mr-auto bg-gray-900"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
