import { useEffect, useState } from "react";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import { fetchNews } from "@/state-managment/slices/news-slice";
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../state-managment/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApartmentTable } from "./apartment-table";
import { NewsTable } from "./news-table";
import { TestimonyTable } from "./testimony-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ApartmentForm } from "./apartment-form";
import { NewsForm } from "./news-form";
import { TestimonyForm } from "./testimony-form";
import type { Apartment } from "@/types/apartment-type";
import type { News } from "@/types/news-type";
import type { Testimony } from "@/types/testimony-type";
import { UpdateApartment } from "./update-apartment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  // fetch apartments
  useEffect(() => {
    if (apartments.length === 0 && !loading) {
      dispatch(fetchApartments());
    }
  }, [dispatch]);
  // fetch news
  useEffect(() => {
    if (newses.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch]);
  // fetch testimonies
  useEffect(() => {
    if (testimonies.length === 0) {
      dispatch(fetchTestimonies());
    }
  }, [dispatch]);
  async function deleteApartment(id: number): Promise<void> {
    try {
      const response = await Axios.delete(
        "https://house-rental-backend-tc9z.onrender.com/api/apartments/" + id
      );
      console.log(response);
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
  const { apartments, loading } = useSelector(
    (state: RootState) => state.apartments
  );
  const { newses } = useSelector((state: RootState) => state.news);
  const { testimonies } = useSelector((state: RootState) => state.testimony);

  const [isAddApartmentOpen, setIsAddApartmentOpen] = useState(false);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [isAddTestimonyOpen, setIsAddTestimonyOpen] = useState(false);

  const [editingApartment, setEditingApartment] = useState<Apartment | null>(
    null
  );
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(
    null
  );

  return (
    <div className="container mx-auto py-30 text-secondary">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="flex flex-col space-y-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Apartments Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-none">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Apartments
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage your apartment listings
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsAddApartmentOpen(true)}
              className="bg-primary  text-white  transition-colors duration-200 w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Apartment
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <ApartmentTable
                apartments={apartments}
                onEdit={setEditingApartment}
                onDelete={deleteApartment}
                // onDelete={() => {}}
              />
            </div>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border  border-gray-300">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">
                News
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage your news articles
              </CardDescription>
            </div>
            <Button
              onClick={() => setIsAddNewsOpen(true)}
              className="bg-primary  text-white  transition-colors duration-200 w-full sm:w-auto"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Add News
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <NewsTable
                news={newses}
                onEdit={() => {}}
                onDelete={() => {}}
                // onDelete={deleteNews}
              />
            </div>
          </CardContent>
        </Card>

        {/* Testimonies Section */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300  border  border-gray-300">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-gray-50 to-white">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Testimonies
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage customer testimonials
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
                onDelete={() => {}}
                // onDelete={deleteTestimony}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Apartment Dialog */}
      <Dialog open={isAddApartmentOpen} onOpenChange={setIsAddApartmentOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add New Apartment</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new apartment listing.
            </DialogDescription>
          </DialogHeader>
          {/* <ApartmentForm onSubmit={addApartment} */}
          <ApartmentForm />
        </DialogContent>
      </Dialog>

      {/* Edit Apartment Dialog */}
      {editingApartment && (
        <Dialog
          open={!!editingApartment}
          onOpenChange={(open) => !open && setEditingApartment(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
            <DialogHeader>
              <DialogTitle>Edit Apartment</DialogTitle>
              <DialogDescription>
                Update the apartment details.
              </DialogDescription>
            </DialogHeader>
            <UpdateApartment apartment={editingApartment} />
          </DialogContent>
        </Dialog>
      )}

      {/* Add News Dialog */}
      <Dialog open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add News Article</DialogTitle>
            <DialogDescription>Create a new news article.</DialogDescription>
          </DialogHeader>
          <NewsForm
            // onSubmit={addNews}
            onSubmit={() => {}}
          />
        </DialogContent>
      </Dialog>

      {/* Edit News Dialog */}
      <Dialog
        open={!!editingNews}
        onOpenChange={(open) => !open && setEditingNews(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
            <DialogDescription>
              Update the news article details.
            </DialogDescription>
          </DialogHeader>
          {editingNews && (
            <NewsForm
              news={editingNews}
              onSubmit={() => {}}

              // onSubmit={updateNews}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Testimony Dialog */}
      <Dialog open={isAddTestimonyOpen} onOpenChange={setIsAddTestimonyOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Add Testimony</DialogTitle>
            <DialogDescription>Add a new customer testimony.</DialogDescription>
          </DialogHeader>
          <TestimonyForm onSubmit={() => {}} />
        </DialogContent>
      </Dialog>

      {/* Edit Testimony Dialog */}
      <Dialog
        open={!!editingTestimony}
        onOpenChange={(open) => !open && setEditingTestimony(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto  bg-white text-secondary">
          <DialogHeader>
            <DialogTitle>Edit Testimony</DialogTitle>
            <DialogDescription>Update the testimony details.</DialogDescription>
          </DialogHeader>
          {editingTestimony && (
            <TestimonyForm
              testimony={editingTestimony}
              onSubmit={() => {}}
              // onSubmit={updateTestimony}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
