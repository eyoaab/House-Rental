import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Apartment } from "@/types/apartment-type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Axios from "axios";

interface DateRangeModalProps {
  open: boolean;
  apartment: Apartment;
  setOpen: (open: boolean) => void;
}

export default function DateRangeModal({
  open,
  setOpen,
  apartment,
}: DateRangeModalProps) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    // check if thee is a token in thelocal storage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login to book an apartment");
      setOpen(false);
    }
    // get the user id by decoding the token
    const decodedToken = JSON.parse(atob(token!.split(".")[1]));
    const userId = decodedToken.id;
    const bookApartment = async () => {
      try {
        const response = await Axios.post(
          "https://house-rental-backend-tc9z.onrender.com/api/bookings",
          {
            userId: userId,
            apartmentId: apartment.id,
            startDate: startDate,
            endDate: endDate,
            totalPrice:
              apartment.price *
              ((new Date(endDate!).getTime() - new Date(startDate!).getTime()) /
                (1000 * 60 * 60 * 24)),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success("Apartment booked successfully");
          setOpen(false);
        } else {
          toast.error("An error occurred, please try again");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred, please try again");
      } finally {
        setLoading(false);
      }
    };

    bookApartment();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px] p-6 bg-white text-secondary">
        <DialogHeader>
          <DialogTitle>Select Start and End Date</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold">Start Date</p>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">End Date</p>
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <Button
          onClick={handleConfirm}
          disabled={!startDate || !endDate || loading}
          className="w-full mt-4"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2 text-white" size={18} />
          ) : (
            <p className="text-white">Confirm Selection</p>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
