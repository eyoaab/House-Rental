import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../state-managment/store";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import { fetchNews } from "@/state-managment/slices/news-slice";
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Clock,
  Home,
  MessageSquareQuote,
  Newspaper,
} from "lucide-react";

export const DashboardOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments, loading: apartmentsLoading } = useSelector(
    (state: RootState) => state.apartments
  );
  const { newses, loading: newsLoading } = useSelector(
    (state: RootState) => state.news
  );
  const { testimonies, loading: testimoniesLoading } = useSelector(
    (state: RootState) => state.testimony
  );

  useEffect(() => {
    if (apartments.length === 0 && !apartmentsLoading) {
      dispatch(fetchApartments());
    }
    if (newses.length === 0 && !newsLoading) {
      dispatch(fetchNews());
    }
    if (testimonies.length === 0 && !testimoniesLoading) {
      dispatch(fetchTestimonies());
    }
  }, [
    dispatch,
    apartments.length,
    newses.length,
    testimonies.length,
    apartmentsLoading,
    newsLoading,
    testimoniesLoading,
  ]);

  // Calculate statistics
  const totalRent = apartments.filter(
    (apt) => apt.status.toLowerCase() === "rent"
  ).length;
  const totalSell = apartments.filter(
    (apt) => apt.status.toLowerCase() === "sell"
  ).length;

  // Get recent items - we'll use simple slicing instead of sorting by createdAt
  // since the model doesn't have that property
  const recentApartments = [...apartments].slice(0, 5);
  const recentNews = [...newses].slice(0, 5);
  const recentTestimonies = [...testimonies].slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-secondary">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="text-secondary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Home className="h-5 w-5 mr-2 text-primary" />
              Properties
            </CardTitle>
            <CardDescription>Total properties listed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{apartments.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              {totalRent} for rent · {totalSell} for sale
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Newspaper className="h-5 w-5 mr-2 text-primary" />
              Blogs
            </CardTitle>
            <CardDescription>Published news articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newses.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              Total published articles
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <MessageSquareQuote className="h-5 w-5 mr-2 text-primary" />
              Testimonies
            </CardTitle>
            <CardDescription>Customer testimonials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{testimonies.length}</div>
            <div className="text-sm text-gray-500 mt-1">
              From satisfied customers
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-primary" />
              Statistics
            </CardTitle>
            <CardDescription>Overall platform data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {apartments.length + newses.length + testimonies.length}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Total content items
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-secondary">
        {/* Recent Properties */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApartments.length > 0 ? (
                recentApartments.map((apartment) => (
                  <div
                    key={apartment.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img
                        src={apartment.imageUrl}
                        alt={apartment.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {apartment.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${apartment.price} · {apartment.status}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No properties found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card className="text-secondary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.length > 0 ? (
                recentNews.map((news) => (
                  <div key={news.id} className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded overflow-hidden">
                      <img
                        src={news.imageUrl as string}
                        alt={news.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {news.title}
                      </p>
                      <p className="text-xs text-gray-500">{news.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No news found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Testimonies */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              Recent Testimonies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTestimonies.length > 0 ? (
                recentTestimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="flex items-center space-x-3"
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {testimony.imageUrl ? (
                        <img
                          src={testimony.imageUrl}
                          alt={testimony.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-medium">
                          {testimony.name?.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {testimony.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {testimony.description.slice(0, 40)}...
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No testimonies found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
