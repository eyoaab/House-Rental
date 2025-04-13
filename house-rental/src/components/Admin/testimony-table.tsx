import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Star, Trash2 } from "lucide-react";
import { Testimony } from "@/types/testimony-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TestimonyTableProps {
  testimonies: Testimony[];
  onEdit: (testimony: Testimony) => void;
  onDelete: (id: number) => void;
}

export function TestimonyTable({
  testimonies,
  onEdit,
  onDelete,
}: TestimonyTableProps) {
  const token = localStorage.getItem("token");
  const creatorId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-white  border-gray-200">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[640px]">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[80px]">
                User
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[150px]">
                Name
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[120px]">
                Rating
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary">
                Description
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-semibold text-secondary w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonies.filter((testimony) => testimony.creatorId == creatorId)
              .length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">No testimonies found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add a new testimony to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              testimonies
                .filter((testimony) => testimony.creatorId == creatorId)
                .map((testimony, index) => (
                  <TableRow
                    key={testimony.id}
                    className={cn(
                      "border-b last:border-b-0 border-gray-200",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50",
                      "hover:bg-gray-50 transition-colors duration-200"
                    )}
                  >
                    <TableCell className="px-6 py-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={testimony.imageUrl}
                          alt={testimony.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-600">
                          {testimony.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-secondary truncate max-w-[150px]">
                      <span title={testimony.name}>{testimony.name}</span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < testimony.rate
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-600"
                            )}
                          />
                        ))}
                        {/* <span className="text-gray-400 text-xs ml-1">
                        ({testimony.rate})
                      </span> */}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-md text-secondary max-w-0">
                      <div
                        className="truncate font-medium text-secondary"
                        title={testimony.description}
                      >
                        {testimony.description}
                      </div>
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
                            onClick={() => onEdit(testimony)}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(testimony.id)}
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
