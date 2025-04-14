import React from "react";
import { AdminSidebar } from "@/components/Admin/admin-sidebar";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/state-managment/store";
// import { logout } from "@/state-managment/slices/user-slice";
import { Button } from "@/components/ui/button";

const AdminLayout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const userName = token
    ? JSON.parse(atob(token.split(".")[1])).username
    : null;

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   dispatch(logout());
  //   navigate("/login");
  // };

  return (
    <div className="flex flex-col lg:flex-row w-screen h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <main className="w-full overflow-y-auto">
        <header
          className="w-full sticky top-0 bg-gradient-to-r from-gray-300 to-gray-200 shadow-md z-10 flex items-center justify-center lg:justify-end pr-3"
          style={{ minHeight: "4rem", height: "10vh" }}
        >
          <div className="flex items-center space-x-3 ">
            {user?.username || userName ? (
              <>
                <div className="text-black border-white/20">
                  {user?.username || userName}
                </div>
                <Link to="/">
                  <div
                    // onClick={handleLogout}
                    className="py-1 px-2 cursor-pointer rounded-md bg-primary hover:text-white border border-gray"
                  >
                    Home
                  </div>
                </Link>
              </>
            ) : (
              <Link to="/">
                <Button
                  variant="outline"
                  className="bg-gray-500 text-white border-white/20 hover:bg-primary"
                >
                  Home
                </Button>
              </Link>
            )}
          </div>
        </header>
        <div className="px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
