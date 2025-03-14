"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Search, X } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  minPrice: number | string;
  setMinPrice: (value: number | string) => void;
  maxPrice: number | string;
  setMaxPrice: (value: number | string) => void;
  noOfRooms: number | string;
  setNoOfRooms: (value: number | string) => void;
  status: string;
  setStatus: (value: string) => void;
}

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  noOfRooms,
  setNoOfRooms,
  status,
  setStatus,
}: FilterBarProps) => {
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  // Handle clearing all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    setNoOfRooms("");
    setStatus("");
    setIsFiltersApplied(false);
  };

  // Apply filters if any filter is set
  const handleApplyFilters = () => {
    setIsFiltersApplied(!!minPrice || !!maxPrice || !!noOfRooms || !!status);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search input with clear functionality */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by apartment name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label htmlFor="price-range">Price Range</Label>
        <div className="flex items-center gap-2">
          <Input
            id="min-price"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <span>to</span>
          <Input
            id="max-price"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Rooms Filter */}
      <div className="space-y-2">
        <Label htmlFor="rooms">Minimum Rooms</Label>
        {/* <Select
          value={noOfRooms.toString()}
          onValueChange={(value) => setNoOfRooms(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any number of rooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent> */}
        {/* </Select> */}
        {/*  */}

        {/* <Select value={status} onValueChange={setStatus}> */}
        {/* <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger> */}
        {/* <SelectContent> */}
        {/* <SelectItem value="">Any</SelectItem>{" "} */}
        {/* Value should be "" to allow clearing the selection */}
        {/* <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rented">Rented</SelectItem> */}
        {/* </SelectContent> */}
        {/* </Select> */}
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        {/* <Select value={status} onValueChange={setStatus}> */}
        {/* <SelectTrigger>
            <SelectValue placeholder="Any status" />
          </SelectTrigger> */}
        {/* <SelectContent>
            <SelectItem value="">Any</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
          </SelectContent> */}
        {/* </Select> */}
      </div>

      {/* Filter Actions */}
      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </div>

      {/* Active filters display */}
      {isFiltersApplied && (
        <div className="flex flex-wrap gap-2 items-center mt-4">
          <span className="text-sm text-muted-foreground">Active filters:</span>

          {minPrice && (
            <Badge onDelete={() => setMinPrice("")}>Min: ${minPrice}</Badge>
          )}

          {maxPrice && (
            <Badge onDelete={() => setMaxPrice("")}>Max: ${maxPrice}</Badge>
          )}

          {noOfRooms && (
            <Badge onDelete={() => setNoOfRooms("")}>{noOfRooms}+ Rooms</Badge>
          )}

          {status && (
            <Badge onDelete={() => setStatus("")}>Status: {status}</Badge>
          )}

          {/* Button to clear all active filters */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-sm h-7 px-2"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

// Custom Badge component with delete functionality
const Badge = ({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) => {
  return (
    <div className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
      {children}
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-4 w-4 p-0 hover:bg-transparent"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};
