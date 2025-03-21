import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../state-managment/slices/news-slice";
import type { RootState, AppDispatch } from "../../state-managment/store";
import { News } from "@/types/news-type";
import NewsCard from "@/components/News/news-card";
import { NewsDetailsDialog } from "@/components/News/dialog";

import { ErrorDisplay } from "../../components/Apartments/error-page";
import { LoadingGrid } from "../../components/Apartments/loading-grid";

const NewssList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newses, error, loading } = useSelector(
    (state: RootState) => state.news
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  useEffect(() => {
    // Check if Newss are already loaded before fetching
    if (newses.length === 0 && !loading) {
      dispatch(fetchNews());
    }
  }, [dispatch]);

  const handleViewDetails = (apartment: News) => {
    setSelectedNews(apartment);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNews(null);
  };

  if (loading) return <LoadingGrid />;

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => dispatch(fetchNews())} />;
  }

  return (
    <div className="w-screen bg-white min-h-screen overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center flex-col bg-white">
        <h1 className="text-4xl text-center font-medium text-secondary my-3">
          All News
        </h1>

        <div className="flex items-center justify-center w-full pt-3 mb-5">
          <p className="text-center text-gray-700  mx-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
            Stay updated with the latest news and insights from around the
            world. Discover stories that matter to you.
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col">
          {newses.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-xl  text-secondary font-medium mb-2">
                No Newss found
              </h3>
              <p className="mb-4 text-gray-800">
                Try adjusting your filters to see more results
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newses.map((news: News) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}

          {selectedNews && (
            <NewsDetailsDialog
              news={selectedNews}
              isOpen={isDialogOpen}
              onClose={handleCloseDialog}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewssList;
