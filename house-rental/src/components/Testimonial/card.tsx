import { Card, CardContent } from "../ui/card";
import type { Testimony } from "../../types/testimony-type";

interface TestimonyCardProps {
  testimony: Testimony;
}

export const TestimonyCard = ({ testimony }: TestimonyCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all shadow-md duration-300 hover:shadow-xl p-4 flex flex-col h-full rounded-lg cursor-pointer border border-gray-200 bg-white">
      <CardContent>
        <div className="flex flex-col items-start space-y-3">
          <img
            src={testimony.imageUrl}
            alt={testimony.title}
            className="w-full h-48 object-cover transition-transform duration-500 rounded-md"
          />
          <div>
            <h2 className="text-lg font-semibold">{testimony.title}</h2>
            {/* Add a rating component here if needed */}
            <p className="text-gray-600">{testimony.description}</p>
          </div>
        </div>
      </CardContent>

      {/* Spacer for Flex Growth */}
      <div className="flex-grow"></div>
    </Card>
  );
};
