import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="max-w-md mx-auto mt-16 p-8 bg-red-50 rounded-lg border border-red-200 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Error Loading Apartments
        </h2>
        <p className="text-red-600 mb-6">{error}</p>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onRetry}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};
