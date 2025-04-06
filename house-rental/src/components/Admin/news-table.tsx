import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { News } from "@/types/news-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsTableProps {
  news: News[];
  onEdit: (news: News) => void;
  onDelete: (id: string) => void;
}

export function NewsTable({ news, onEdit, onDelete }: NewsTableProps) {
  return (
    <div className="rounded-lg  shadow-sm overflow-hidden bg-white border border-gray-200">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[640px]">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-400">
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[120px]">
                Image
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[300px]">
                Title
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[150px]">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-semibold text-secondary w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">
                      No news articles found
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add a new article to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              news.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    "border-b last:border-b-0 border-gray-300",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50",
                    "hover:bg-gray-100 transition-colors duration-200"
                  )}
                >
                  <TableCell className="px-6 py-4">
                    <div className="relative h-12 w-20">
                      <img
                        src={
                          item.imageUrl
                            ? String(item.imageUrl)
                            : "/placeholder.png"
                        }
                        alt={item.title}
                        className="object-cover rounded-md shadow-sm w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-secondary truncate max-w-[300px]">
                    <span title={item.title}>{item.title}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-9 w-9 p-0 rounded-full hover:bg-gray-200"
                        >
                          <MoreHorizontal className="h-5 w-5 text-gray-600" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <DropdownMenuItem
                          onClick={() => onEdit(item)}
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(item.id)}
                          className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
