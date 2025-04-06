import React, { useEffect } from "react";
import { DashboardOverview } from "@/components/Admin/dashboard-overview";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { AppDispatch } from "@/state-managment/store";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setSelectedIndex(5)); // Update to the correct index for admin
  }, [dispatch]);

  return (
    <div className="container mx-auto py-6">
      <DashboardOverview />
    </div>
  );
}
