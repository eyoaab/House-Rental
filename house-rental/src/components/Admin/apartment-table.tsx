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
import type { Apartment } from "@/types/apartment-type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const token = localStorage.getItem("token");
const creatorId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

interface ApartmentTableProps {
  apartments: Apartment[];
  onEdit: (apartment: Apartment) => void;
  onDelete: (id: number) => void;
}

export function ApartmentTable({
  apartments,
  onEdit,
  onDelete,
}: ApartmentTableProps) {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden bg-white borde border-gray-200">
      <div className="overflow-x-auto">
        <Table className="w-full min-w-[640px]">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-500">
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[80px]">
                Image
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[200px]">
                Title
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[180px]">
                Location
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[100px]">
                Rooms
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[120px]">
                Price
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[120px]">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-left font-semibold text-secondary w-[100px]">
                Rating
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-semibold text-secondary w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apartments.filter((apartment) => apartment.creatorId == creatorId)
              .length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm font-medium">No apartments found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Add a new apartment to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              apartments
                .filter((apartment) => apartment.creatorId == creatorId)
                .map((apartment, index) => (
                  <TableRow
                    key={apartment.id}
                    className={cn(
                      "border-b last:border-b-0 border-gray-300",
                      index % 2 === 0 ? "bg-white" : "bg-gray-50",
                      "hover:bg-gray-100 transition-colors duration-200"
                    )}
                  >
                    <TableCell className="px-6 py-4">
                      <img
                        src={
                          apartment.imageUrl && apartment.imageUrl.trim() !== ""
                            ? apartment.imageUrl
                            : "./placeholder.png"
                        }
                        alt={apartment.title}
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 font-medium text-secondary truncate max-w-[200px]">
                      <span title={apartment.title}>{apartment.title}</span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700 truncate max-w-[180px]">
                      <span title={apartment.location}>
                        {apartment.location}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700">
                      {apartment.noRoom}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-700">
                      <span className="font-medium">
                        ${apartment.price.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Badge
                        className={cn(
                          "font-medium",
                          apartment.status.toLocaleLowerCase() === "sell"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-primary"
                        )}
                      >
                        {apartment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-700 font-medium">
                          {apartment.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-xs ml-1">/5</span>
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
                            onClick={() => onEdit(apartment)}
                            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDelete(apartment.id)}
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
