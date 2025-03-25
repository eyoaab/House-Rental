import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import type { RootState, AppDispatch } from "../../state-managment/store";
import type { Apartment } from "../../types/apartment-type";
import { ApartmentCard } from "../../components/Apartments/card";
import { ApartmentDetailsDialog } from "../../components/Apartments/dialog";
import { ErrorDisplay } from "../../components/Apartments/error-page";
import { LoadingGrid } from "../../components/Apartments/loading-grid";
import PropertySearch from "@/components/Common/search-drop-down";
import { useSearchParams } from "react-router-dom";
import { setSelectedIndex } from "@/state-managment/slices/navigation-slice";

const ApartmentsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setSelectedIndex(1));
  }, [dispatch]);
  const { apartments, loading, error } = useSelector(
    (state: RootState) => state.apartments
  );

  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || ""
  );
  const [selectedCatagory, setSelectedcatagory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || ""
  );
  const [isFor, setIsFor] = useState(searchParams.get("isFor") || ""); // to truck whther it is for rent or sell

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );
  // function to handlethe changes in teh state
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };
  const handleCatagorySelect = (category: string) => {
    setSelectedcatagory(category);
  };
  const handleIsFor = (isFor: string) => {
    setIsFor(isFor);
  };

  // // Filter apartments based on search criteria
  const filteredApartments = apartments.filter((apartment) => {
    return (
      (selectedType === "" || apartment.status.includes(selectedType)) &&
      (selectedLocation === "" ||
        selectedLocation === "Location" ||
        apartment.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase())) &&
      (selectedCatagory === "" ||
        selectedCatagory === "Property Type" ||
        apartment.catagory
          .toLowerCase()
          .includes(selectedCatagory.toLowerCase()))
    );
  });

  useEffect(() => {
    // Check if apartments are already loaded before fetching
    if (apartments.length === 0 && !loading) {
      dispatch(fetchApartments());
    }
  }, [dispatch]);

  const handleViewDetails = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedApartment(null);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-start w-full h-full">
        <PropertySearch
          isFromHomePage={false}
          selectedLocation={selectedLocation}
          selectedCatagory={selectedCatagory}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
          onLocationSelect={handleLocationSelect}
          onCatagorySelect={handleCatagorySelect}
          onIsFor={handleIsFor}
          isFor={isFor}
        />
        <LoadingGrid />;
      </div>
    );

  if (error) {
    return (
      <ErrorDisplay error={error} onRetry={() => dispatch(fetchApartments())} />
    );
  }

  return (
    <div className="min-w-full bg-white min-h-full mb-30 py-5 mt-5 md:mt-24">
      <div className="p-5  flex items-center justify-center flex-col bg-white">
        <PropertySearch
          isFromHomePage={false}
          selectedLocation={selectedLocation}
          selectedCatagory={selectedCatagory}
          selectedType={selectedType}
          onTypeSelect={handleTypeSelect}
          onLocationSelect={handleLocationSelect}
          onCatagorySelect={handleCatagorySelect}
          onIsFor={handleIsFor}
          isFor={isFor}
        />
        <div className="h-6"></div>

        <div className="w-full flex items-center justify-center flex-col">
          {filteredApartments.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-xl  text-secondary font-medium mb-2">
                No apartments found
              </h3>
              <p className="mb-4 text-gray-800">
                Try adjusting your filters to see more results
              </p>
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
    </div>
  );
};

export default ApartmentsList;
