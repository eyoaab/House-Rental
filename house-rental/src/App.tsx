import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./pages/Authentication/signup-page";
import LoginPage from "./pages/Authentication/login-page";
import MainLayout from "./layout/main-layout";
import PageNotFound from "./components/Common/page-not-found";
import ApartmentsList from "./pages/Apartments/apartments-page";
import { ToastContainer } from "react-toastify";
import NewssList from "./pages/News/all-news";
import BasicLayout from "./layout/basic-layout";
import AboutPage from "./pages/About/about-page";
import ServicesList from "./pages/services/services-page";
import AdminLayout from "./layout/admin-layout";
import DashboardPage from "./pages/Admin/dashboard-page";
import PropertiesPage from "./pages/Admin/properties-page";
import BlogsPage from "./pages/Admin/blogs-page";
import TestimoniesPage from "./pages/Admin/testimonies-page";
import AdminPage from "./pages/Admin/admin-page";
import AddPropertyPage from "./pages/Admin/add-property-page";
import AddBlogPage from "./pages/Admin/add-blog-page";
import AddTestimonyPage from "./pages/Admin/add-testimony-page";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<MainLayout />} />
            <Route path="/apartments" element={<ApartmentsList />} />
            <Route path="/news" element={<NewssList />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/admin-old" element={<AdminPage />} />
          </Route>

          {/* Admin Routes with Sidebar */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="properties/new" element={<AddPropertyPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/new" element={<AddBlogPage />} />
            <Route path="testimonies" element={<TestimoniesPage />} />
            <Route path="testimonies/new" element={<AddTestimonyPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
