import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import type { RootState, AppDispatch } from "../../state-managment/store";
import type { Apartment } from "../../types/apartment-type";
import { Button } from "../../components/ui/button";
import { ApartmentCard } from "../../components/Apartments/card";
import { ApartmentDetailsDialog } from "../../components/Apartments/dialog";
import { ErrorDisplay } from "../../components/Apartments/error-page";
import { LoadingGrid } from "../../components/Apartments/loading-grid";

const ApartmentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments, loading, error } = useSelector(
    (state: RootState) => state.apartments
  );

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [noOfRooms, setNoOfRooms] = useState<number | string>("");
  const [status, setStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

  // Filter apartments based on search criteria
  const filteredApartments = apartments.filter((apartment) => {
    return (
      apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice ? apartment.price >= Number(minPrice) : true) &&
      (maxPrice ? apartment.price <= Number(maxPrice) : true) &&
      (noOfRooms ? Number(apartment.noRoom) >= Number(noOfRooms) : true) &&
      (status ? apartment.status.toLowerCase() === status.toLowerCase() : true)
    );
  });

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const handleViewDetails = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedApartment(null);
  };

  if (loading) return <LoadingGrid />;

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => dispatch(fetchApartments())} />
    );
  }

  return (
    <div className="p-5 w-full flex items-center justify-center flex-col">
      {/* 
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        noOfRooms={noOfRooms}
        setNoOfRooms={setNoOfRooms}
        status={status}
        setStatus={setStatus}
      /> */}

      <div className="w-full flex items-center justify-center flex-col">
        {filteredApartments.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl  text-black font-medium mb-2">
              No apartments found
            </h3>
            <p className="mb-4">
              Try adjusting your filters to see more results
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setMinPrice("");
                setMaxPrice("");
                setNoOfRooms("");
                setStatus("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredApartments.map((apartment: Apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {selectedApartment && (
          <ApartmentDetailsDialog
            apartment={selectedApartment}
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
          />
        )}
      </div>
    </div>
  );
};

export default ApartmentsList;
