import { Outlet } from "react-router-dom";
import Header from "@/components/Common/header";
import Footer from "@/components/Common/footer";

export default function BasicLayout() {
  return (
    <div className="scrollbar-hidden flex flex-col max-w-[1440px] mx-auto bg-white">
      <div className="sticky top-0 lg:pr-10 md:pr-1 sm:pr-10 pr-5 z-50">
        <Header />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
