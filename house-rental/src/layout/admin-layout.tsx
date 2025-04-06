import React from "react";
import { AdminSidebar } from "@/components/Admin/admin-sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <main className="w-full overflow-y-auto p-4 md:p-6 pt-20 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
