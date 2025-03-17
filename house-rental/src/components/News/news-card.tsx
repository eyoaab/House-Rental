import React from "react";
import { FaCalendar } from "react-icons/fa";
import { News } from "@/types/news-type";

type NewsCardProps = {
  news: News;
  onViewDetails: (news: News) => void;
};

const NewsCard: React.FC<NewsCardProps> = ({ news, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(news)}
      className="max-w-sm rounded-md overflow-hidden shadow-md bg-white pb-2 flex flex-col cursor-pointer"
    >
      <img
        className="w-full h-48 object-cover"
        src={`${news.imageUrl}`}
        alt={news.title}
      />
      <div className="px-4 py-2">
        <div className="text-gray-700 font-bold text-[16px] mb-1">
          {news.title}
        </div>
        <div className="text-gray-700 text-[14px] max-h-24 overflow-y-auto">
          {news.description.length > 70
            ? `${news.description.substring(0, 70)}...`
            : news.description}
        </div>
      </div>
      {/* Spacer for Flex Growth */}
      <div className="flex-grow"></div>

      <div className="px-4 pt-2 pb-1">
        <span className="flex flex-row items-center justify-start text-secondary">
          <FaCalendar className="inline-block mr-2 text-primary" />
          <p className="text-[14px]">{news.date}</p>
        </span>
      </div>
    </div>
  );
};

export default NewsCard;
