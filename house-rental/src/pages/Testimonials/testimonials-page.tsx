import TestimonyCard from "./../../components/Testimonial/card";
// import type { Testimony } from "../../types/testimony-type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../state-managment/store";
// import the arrow left and arrow right from react-icons
import { ArrowRight, ArrowLeft } from "lucide-react";
import { fetchTestimonies } from "@/state-managment/slices/testimony-slice";

const TestimonyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { testimonies, loading, error } = useSelector(
    (state: RootState) => state.testimony
  );

  useEffect(() => {
    // Check if apartments are already loaded before fetching
    if (testimonies.length === 0 && !loading) {
      dispatch(fetchTestimonies());
    }
  }, [dispatch]);

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
  if (loading) {
    return <div className="flex justify-center items-center"></div>;
  }
  if (error) {
    return <div className="flex justify-center items-center"></div>;
  }

  return (
    <div className="py-4 max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 my-10">
      <p className="text-4xl font-semibold text-center text-secondary">
        Testimonials
      </p>
      <div className="flex items-center justify-center w-full py-3">
        <p className="text-center text-gray-700 mt-2 max-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
          Hear what our satisfied customers have to say about their experiences
          with us. Their feedback inspires us to continue delivering exceptional
          service and quality.
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
        {testimonies.length > 0 && (
          <TestimonyCard
            key={testimonies[index].id}
            name={testimonies[index].name}
            rating={testimonies[index].rate}
            image={testimonies[index].imageUrl}
            content={testimonies[index].description}
          />
        )}
      </div>
    </div>
  );
};

export default TestimonyList;
