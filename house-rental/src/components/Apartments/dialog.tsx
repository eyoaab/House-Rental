import { Badge } from "../ui/badge";
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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="scrollbar-hidden sm:max-w-3xl max-h-[90vh] overflow-y-auto py-4 bg-white text-secondary w-full sm:w-auto overflow-x-hidden">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold text-start">
                {apartment.title}
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 text-primary" />
                {apartment.location}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="scrollbar-hidden space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              // src={
              //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnakZlnxxgnoWPcILVLnvcfnct7DSJ8yBYBQ&s"
              // }
              src={`${apartment.imageUrl}`}
              alt={apartment.title}
              className="w-full h-[180px] sm:h-[280px] object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-primary text-white">
                For {apartment.status}
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
                <div className="p-2 bg-primary/10 rounded-full">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Rooms
                  </h3>
                  <p className="font-semibold text-md">{apartment.noRoom}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-4 w-4 text-primary" />
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
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
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
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Available To
                  </h3>
                  <p className="font-semibold text-md">
                    {apartment.availableTo
                      ? apartment.availableTo.slice(0, 10)
                      : "Now"}
                    {/* {apartment.availableTo.slice(0, 10)} */}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-md font-medium mb-2">Property Features</h3>
          <div className="flex flex-wrap gap-2">
            {apartment.features.map((feature) => (
              <Badge key={feature} className="bg-secondary/10 text-primary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-6 ">
          <p
            onClick={onClose}
            className="sm:mr-auto text-primary  cursor-pointer hover:underline"
          >
            close
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
