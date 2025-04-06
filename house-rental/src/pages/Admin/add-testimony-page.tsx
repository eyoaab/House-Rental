import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { AppDispatch } from "@/state-managment/store";
import { TestimonyForm } from "@/components/Admin/testimony-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddTestimonyPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSelectedIndex(5));
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6">
      <Card className="shadow-lg transition-shadow duration-300 border border-gray-200">
        <CardHeader className="p-6 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Add New Testimony
          </CardTitle>
          <CardDescription className="text-gray-600">
            Add a new customer testimony
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <TestimonyForm />
        </CardContent>
      </Card>
    </div>
  );
}
