import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

import { FC } from "react";

interface TestimonialCardProps {
  name: string;
  image: string;
  content: string;
  rating: number;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  image,
  content,
  rating,
}) => {
  return (
    <Card className="border-gray-100 w-full flex flex-col md:flex-row items-center p-6 space-x-6 shadow-sm border rounded-lg">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200"
      />

      {/* Content */}
      <CardContent className="flex-1 text-center md:text-left md:w-auto">
        <p className="text-sm text-gray-500">{name}</p>

        {/* Rating */}
        <div className="flex justify-center md:justify-start space-x-1 text-yellow-500 my-2">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < rating ? "text-yellow-500" : "text-gray-300"}
            />
          ))}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>

        <p className="mt-4 text-lg font-signature">{name}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
