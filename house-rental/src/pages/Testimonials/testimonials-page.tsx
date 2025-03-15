import { TestimonyCard } from "./../../components/Testimonial/card";
import type { Testimony } from "../../types/testimony-type";

const testimonies: Testimony[] = [
  {
    id: 1,
    imageUrl: "./image2.jpeg",
    title: "Great Experience!",
    description:
      "I had an amazing time using this product. Highly recommended!",
    rating: 5,
  },
  //   {
  //     id: 2,
  //     imageUrl: "./image2.jpeg",
  //     title: "Loved it!",
  //     description: "Absolutely wonderful service and support. Will use again!",
  //     rating: 4,
  //   },
  //   {
  //     id: 3,
  //     imageUrl: "./image3.jpeg",
  //     title: "Fantastic!",
  //     description: "Exceeded my expectations in every way possible.",
  //     rating: 5,
  //   },
];

const TestimonyList = () => {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex space-x-4 w-max px-4">
        {testimonies.map((testimony, index) => (
          <TestimonyCard key={index} testimony={testimony} />
        ))}
      </div>
    </div>
  );
};

export default TestimonyList;
