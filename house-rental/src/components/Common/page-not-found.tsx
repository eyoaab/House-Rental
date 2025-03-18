import React from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const PageNotFound: React.FC = () => {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-screen justify-center min-h-screen bg-gray-100 text-secondary px-3"
      )}
    >
      <h1 className={cn("text-6xl font-bold text-primary")}>404</h1>
      <h2 className={cn("text-2xl font-semibold mt-4")}>Page Not Found</h2>
      <p className={cn("text-lg mt-2 text-center max-w-md")}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className={cn(
          "mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        )}
      >
        Go Back to Home
      </Link>
    </div>
  );
};
export default PageNotFound;
