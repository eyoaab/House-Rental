import React, { useEffect } from "react";
import { fetchApartments } from "@/state-managment/slices/apartments-slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/state-managment/store";
import { ApartmentTable } from "@/components/Admin/apartment-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { ApartmentForm } from "@/components/Admin/apartment-form";
import { UpdateApartment } from "@/components/Admin/update-apartment";
import axios from "axios";
import { toast } from "react-toastify";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import type { Apartment } from "@/types/apartment-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PropertiesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments, loading } = useSelector(
    (state: RootState) => state.apartments
  );
  const [isAddApartmentOpen, setIsAddApartmentOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null
  );

  useEffect(() => {
    dispatch(setSelectedIndex(5)); // Update to the correct index for admin
    if (apartments.length === 0 && !loading) {
      dispatch(fetchApartments());
    }
  }, [dispatch, apartments.length, loading]);

  async function deleteApartment(id: number): Promise<void> {
    try {
      const response = await axios.delete(
        "https://house-rental-backend-tc9z.onrender.com/api/apartments/" + id
      );
      if (response.status === 200) {
        dispatch(fetchApartments()); // Refresh the apartments list after deletion
        toast.success("Apartment deleted successfully");
      } else {
        toast.error("Failed to delete apartment");
        console.error("Failed to delete apartment");
      }
    } catch (error) {
      toast.error("Error deleting apartment");
      console.error("Error deleting apartment:", error);
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-none">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Properties Management
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage your property listings
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddApartmentOpen(true)}
            className="bg-primary text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Property
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <ApartmentTable
              apartments={apartments}
              onEdit={setEditingApartment}
              onDelete={deleteApartment}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Apartment Dialog */}
      <Dialog open={isAddApartmentOpen} onOpenChange={setIsAddApartmentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new property listing.
            </DialogDescription>
          </DialogHeader>
          <ApartmentForm />
        </DialogContent>
      </Dialog>

      {/* Edit Apartment Dialog */}
      {editingApartment && (
        <Dialog
          open={!!editingApartment}
          onOpenChange={(open) => !open && setEditingApartment(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
            <DialogHeader>
              <DialogTitle>Edit Property</DialogTitle>
              <DialogDescription>
                Update the property details.
              </DialogDescription>
            </DialogHeader>
            <UpdateApartment apartment={editingApartment} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
