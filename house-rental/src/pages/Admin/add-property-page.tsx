import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { AppDispatch } from "@/state-managment/store";
import { ApartmentForm } from "@/components/Admin/apartment-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddPropertyPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSelectedIndex(5));
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6 text-secondary">
      <Card className="shadow-lg transition-shadow duration-300 border border-gray-200">
        <CardHeader className="p-6 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Add New Property
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the details to add a new property listing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ApartmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
