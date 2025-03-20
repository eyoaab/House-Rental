import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { FaCalendar } from "react-icons/fa";
import { News } from "@/types/news-type";

interface NewsDetailsDialogProps {
  news: News;

  isOpen: boolean;
  onClose: () => void;
}

export const NewsDetailsDialog = ({
  news,
  isOpen,
  onClose,
}: NewsDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="scrollbar-hidden sm:max-w-3xl max-h-[90vh] overflow-y-auto py-4 bg-white text-secondary w-full sm:w-auto overflow-x-hidden">
        <DialogHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-semibold text-start w-[95%]">
                {news.title}
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                <FaCalendar className="h-4 w-4 text-primary" />
                {news.date.slice(0, 10)}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="scrollbar-hidden space-y-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={news.imageUrl ? `${news.imageUrl}` : "placeholder.png"}
              alt={news.title}
              className="w-full h-[180px] sm:h-[280px] object-cover"
            />
          </div>

          <div>
            <p className="text-muted-foreground text-start">
              {news.description}
            </p>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 mt-6 ">
          <p
            onClick={onClose}
            className="sm:mr-auto text-primary  cursor-pointer hover:underline"
          >
            close
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
