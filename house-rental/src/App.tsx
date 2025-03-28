// App.tsx
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
import AdminDashboard from "./components/Admin/admin-dashboard";
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
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/news" element={<NewssList />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesList />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
