import AdminDashboard from "@/components/Admin/admin-dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";
import { AppDispatch } from "@/state-managment/store";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setSelectedIndex(5));
  }, [dispatch]);
  return (
    <div className="container mx-auto">
      <AdminDashboard />
    </div>
  );
}
