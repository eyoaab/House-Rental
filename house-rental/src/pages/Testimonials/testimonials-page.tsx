import { useState } from "react";
import TestimonyCard from "./../../components/Testimonial/card";
import type { Testimony } from "../../types/testimony-type";
// import the arrow left and arrow right from react-icons
import { ArrowRight, ArrowLeft } from "lucide-react";

const testimonies: Testimony[] = [
  {
    id: 1,
    imageUrl: "./ceo.jpeg",
    title: "Great Experience!",
    description:
      "I had an amazing time using this product. Highly recommended! I had an amazing time using this product. Highly recommended! I had an amazing time using this product. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    imageUrl: "./image2.jpeg",
    title: "Loved it!",
    description: "Absolutely wonderful service and support. Will use again!",
    rating: 4,
  },
  {
    id: 3,
    imageUrl: "./profile.jpeg",
    title: "Fantastic!",
    description: "Exceeded my expectations in every way possible.",
    rating: 5,
  },
];

const TestimonyList = () => {
  const [index, setIndex] = useState(0);
  // functionto increment the inde
  const incrementIndex = () => {
    if (index < testimonies.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  // function to decrement the index
  const decrementIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(testimonies.length - 1);
    }
  };
  return (
    <div className="py-4 max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 my-10">
      <p className="text-4xl font-semibold text-center text-secondary">
        Testimonials
      </p>
      <div className="flex items-center justify-center w-full py-3">
        <p className="text-center text-gray-700 mt-2 max-auto w-[40%] md:w-[40%] lg:w-[50%] text-[16px]">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
          repudiandae exercitationem doloribus cumque! Labore unde itaque
          adipisci deserunt. Vero officiis corporis porro doloribus nesciunt
          ratione
        </p>
      </div>
      {/* the arrow section */}
      <div className="flex items-end justify-end  my-4">
        <div className="flex flex-row gap-4 items-center">
          <div
            className="p-2 bg-primary rounded-full cursor-pointer text-white hover:bg-primary-dark transition duration-300"
            onClick={decrementIndex}
            aria-label="Previous Testimony"
          >
            <ArrowLeft size={24} />
          </div>
          <div
            className="p-2 rounded-full cursor-pointer bg-primary text-white hover:bg-primary-dark transition duration-300"
            onClick={incrementIndex}
            aria-label="Next Testimony"
          >
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center space-x-4 w-full px-4 max-w-[1440px] mx-auto">
        <TestimonyCard
          key={index}
          name={testimonies[index].title}
          rating={testimonies[index].rating}
          image={testimonies[index].imageUrl}
          content={testimonies[index].description}
        />
      </div>
    </div>
  );
};

export default TestimonyList;
