import React, { useEffect } from "react";
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/state-managment/store";
import { TestimonyTable } from "@/components/Admin/testimony-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { TestimonyForm } from "@/components/Admin/testimony-form";
import { UpdateTestimony } from "@/components/Admin/update-testimony";
import axios from "axios";
import { toast } from "react-toastify";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import type { Testimony } from "@/types/testimony-type";
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

export default function TestimoniesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { testimonies, loading } = useSelector(
    (state: RootState) => state.testimony
  );
  const [isAddTestimonyOpen, setIsAddTestimonyOpen] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(
    null
  );

  useEffect(() => {
    dispatch(setSelectedIndex(5)); // Update to the correct index for admin
    if (testimonies.length === 0 && !loading) {
      dispatch(fetchTestimonies());
    }
  }, [dispatch, testimonies.length, loading]);

  async function deleteTestimony(id: number): Promise<void> {
    try {
      const response = await axios.delete(
        "https://house-rental-backend-tc9z.onrender.com/api/testimony/" + id
      );
      if (response.status === 200) {
        dispatch(fetchTestimonies()); // Refresh the testimonies list after deletion
        toast.success("Testimony deleted successfully");
      } else {
        toast.error("Failed to delete testimony");
        console.error("Failed to delete testimony");
      }
    } catch (error) {
      toast.error("Error deleting testimony");
      console.error("Error deleting testimony:", error);
    }
  }

  return (
    <div className="p-6 w-full">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-none">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Testimonies Management
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage your customer testimonials
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddTestimonyOpen(true)}
            className="bg-primary text-white transition-colors duration-200 w-full sm:w-auto"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Testimony
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <TestimonyTable
              testimonies={testimonies}
              onEdit={setEditingTestimony}
              onDelete={deleteTestimony}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Testimony Dialog */}
      <Dialog open={isAddTestimonyOpen} onOpenChange={setIsAddTestimonyOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add New Testimony</DialogTitle>
            <DialogDescription>Add a new customer testimony.</DialogDescription>
          </DialogHeader>
          <TestimonyForm />
        </DialogContent>
      </Dialog>

      {/* Edit Testimony Dialog */}
      {editingTestimony && (
        <Dialog
          open={!!editingTestimony}
          onOpenChange={(open) => {
            if (!open) setEditingTestimony(null);
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-secondary">
            <DialogHeader>
              <DialogTitle>Edit Testimony</DialogTitle>
              <DialogDescription>
                Update the testimony details.
              </DialogDescription>
            </DialogHeader>
            <UpdateTestimony testimony={editingTestimony} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
