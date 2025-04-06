import { useEffect } from "react";
import { DashboardOverview } from "@/components/Admin/dashboard-overview";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { AppDispatch } from "@/state-managment/store";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSelectedIndex(5));
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6">
      <DashboardOverview />
    </div>
  );
}
