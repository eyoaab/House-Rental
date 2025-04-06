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
  MessageSquareQuote,
  Newspaper,
  TrendingUp,
  Building,
} from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, title, description, value, subValue }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-none ring-1 ring-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-primary/5 rounded-full" />
        <CardTitle className="text-lg font-medium flex items-center z-10">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-gray-800">{value}</div>
        {subValue && (
          <div className="text-sm text-gray-500 mt-1 flex items-center">
            {subValue}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const RecentCard = ({ title, items, renderItem }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <Card className="bg-white/50 backdrop-blur-sm border-none ring-1 ring-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item: any) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                {renderItem(item)}
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No items found</p>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

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

  const totalRent = apartments.filter(
    (apt) => apt.status.toLowerCase() === "rent"
  ).length;
  const totalSell = apartments.filter(
    (apt) => apt.status.toLowerCase() === "sell"
  ).length;

  const recentApartments = [...apartments].slice(0, 5);
  const recentNews = [...newses].slice(0, 5);
  const recentTestimonies = [...testimonies].slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 space-y-8 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-secondary bg-clip-text bg-gradient-to-r from-primary to-primary/80"
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Building}
          title="Properties"
          description="Total properties listed"
          value={apartments.length}
          subValue={
            <>
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              {totalRent} for rent · {totalSell} for sale
            </>
          }
        />
        <StatCard
          icon={Newspaper}
          title="Blogs"
          description="Published news articles"
          value={newses.length}
          subValue="Total published articles"
        />
        <StatCard
          icon={MessageSquareQuote}
          title="Testimonies"
          description="Customer testimonials"
          value={testimonies.length}
          subValue="From satisfied customers"
        />
        <StatCard
          icon={BarChart}
          title="Statistics"
          description="Overall platform data"
          value={apartments.length + newses.length + testimonies.length}
          subValue="Total content items"
        />
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-secondary">
        <RecentCard
          title="Recent Properties"
          items={recentApartments}
          renderItem={(apartment: any) => (
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="h-12 w-12 rounded-lg overflow-hidden ring-2 ring-gray-100">
                <img
                  src={apartment.imageUrl}
                  alt={apartment.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                  {apartment.title}
                </p>
                <p className="text-xs text-gray-500">
                  ${apartment.price} · {apartment.status}
                </p>
              </div>
            </div>
          )}
        />

        <RecentCard
          title="Recent News"
          items={recentNews}
          renderItem={(news: any) => (
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="h-12 w-12 rounded-lg overflow-hidden ring-2 ring-gray-100">
                <img
                  src={news.imageUrl as string}
                  alt={news.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                  {news.title}
                </p>
                <p className="text-xs text-gray-500">
                  {news.date.slice(0, 10)}
                </p>
              </div>
            </div>
          )}
        />

        <RecentCard
          title="Recent Testimonies"
          items={recentTestimonies}
          renderItem={(testimony: any) => (
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
              <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-100 bg-gray-200 flex items-center justify-center">
                {testimony.imageUrl ? (
                  <img
                    src={testimony.imageUrl}
                    alt={testimony.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {testimony.name?.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                  {testimony.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {testimony.description.slice(0, 40)}...
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
