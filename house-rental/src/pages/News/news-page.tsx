import NewsCard from "@/components/News/news-card";
import { useState, useEffect } from "react";
import { NewsDetailsDialog } from "@/components/News/dialog";
import { News } from "@/types/news-type";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../state-managment/slices/news-slice";
import type { RootState, AppDispatch } from "../../state-managment/store";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { newses, error, loading } = useSelector(
    (state: RootState) => state.news
  );
  useEffect(() => {
    if (newses.length == 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, newses]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const handleViewDetails = (news: News) => {
    setSelectedNews(news);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNews(null);
  };
  if (loading) return <div></div>;

  if (error) {
    return <div></div>;
  }
  if (newses.length === 0) {
    return <div></div>;
  }

  return (
    <div className="container pb-5 flex flex-col items-center max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5">
      <p className="text-4xl font-semibold text-center text-secondary">
        Latest News Feeds
      </p>

      <div className="flex items-center justify-center w-full py-3 mb-5">
        <p className="text-center text-gray-700 mt-2 max-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          repudiandae exercitationem{" "}
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {newses.slice(0, Math.min(newses.length, 3)).map((news: News) => (
          <NewsCard
            key={news.id}
            news={news}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(newses.length > 3 ? newses.slice(0, 3) : newses).map(
          (news: News, index: number) => (
            <div
              key={news.id}
              className={`
                          ${index === 2 ? "lg:mt-0 lg:mb-28" : ""}
                          ${index === 1 ? "lg:mt-14 lg:mb-14" : ""}
                          ${index === 0 ? "lg:mt-28 lg:mb-0" : ""}
                        `}
            >
              <NewsCard news={news} onViewDetails={handleViewDetails} />
            </div>
          )
        )}
      </div>
      {selectedNews && (
        <NewsDetailsDialog
          news={selectedNews}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
      {/* the explore more part */}
      <div className="flex items-center justify-center w-full mt-10">
        <Link to="/news">
          <p className="flex items-center justify-center text-white px-4 py-2  bg-primary rounded-lg cursor-pointer">
            Explore More
          </p>
        </Link>
      </div>
    </div>
  );
};

export default NewsPage;
