import NewsCard from "@/components/News/news-card";
import { useState } from "react";
import { NewsDetailsDialog } from "@/components/News/dialog";
import { News } from "@/types/news-type";

const NewsPage = () => {
  const newsItems: News[] = [
    {
      id: 1,
      title: "Recent Movements in Commercial Real Estate",
      date: "13 November",
      description:
        "Lorem ipsum dolor sit amet consectetur. Conradis magnet ut tellus interdit leo at.",
      imageUrl: "./image2.jpeg",
    },
    {
      id: 2,
      title: "The most inspiring interior design of 2024",
      date: "2 August",
      description:
        "Lorem ipsum dolor sit amet consectetur. Espinal luctus feugiat elit non.",
      imageUrl: "./image1.jpeg",
    },
    {
      id: 3,
      title: "Latest Commercial Property Transactions and Trends",
      date: "23 October",
      description:
        "Lorem ipsum dolor sit amet consectetur. Except amet vaker non purus.",
      imageUrl: "./about.jpeg",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {newsItems.map((news: News) => (
          <NewsCard
            key={news.id}
            news={news}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
      {selectedNews && (
        <NewsDetailsDialog
          news={selectedNews}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default NewsPage;
