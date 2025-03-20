import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApartments } from "../../state-managment/slices/apartments-slice";
import type { RootState, AppDispatch } from "../../state-managment/store";
import type { Apartment } from "../../types/apartment-type";
import { ApartmentCard } from "./card";
import { ApartmentDetailsDialog } from "./dialog";
import { Link } from "react-router-dom";
const RecomenedApartments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { apartments, loading, error } = useSelector(
    (state: RootState) => state.apartments
  );

  // State for filters
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(
    null
  );

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

  if (loading) return <div></div>;

  if (error) {
    return <div></div>;
  }

  return (
    <div className="p-5 max-w-[1440px] mx-auto lg:px-20 md:px-15 sm:px-10 px-5 my-10">
      <div className="w-full">
        {apartments.length === 0 ? (
          <div></div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-3">
            <p className="text-4xl font-semibold text-center text-secondary">
              Discover Popular Properties
            </p>
            <div className="flex items-center justify-center w-full py-3">
              <p className="text-center text-gray-700 mt-2 max-auto w-[80%] md:w-[60%] lg:w-[50%] text-[16px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
                repudiandae exercitationem doloribus cumque!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(apartments.length > 3
                ? apartments.slice(0, 3)
                : apartments
              ).map((apartment: Apartment, index: number) => (
                <div
                  key={apartment.id}
                  className={`
                    ${index === 0 ? "lg:mt-0 lg:mb-28" : ""}
                    ${index === 1 ? "lg:mt-14 lg:mb-14" : ""}
                    ${index === 2 ? "lg:mt-28 lg:mb-0" : ""}
                  `}
                >
                  <ApartmentCard
                    apartment={apartment}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
            {/* the explore more part */}
            <div className="flex items-center justify-center w-full mt-10">
              <Link to="/apartments">
                <p className="flex items-center justify-center text-white px-4 py-2  bg-primary rounded-lg cursor-pointer">
                  Explore More
                </p>
              </Link>
            </div>
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

export default RecomenedApartments;
