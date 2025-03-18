import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingGrid = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="flex flex-col items-center">
        <AiOutlineLoading3Quarters className="animate-spin text-primary text-5xl" />
      </div>
    </div>
  );
};
