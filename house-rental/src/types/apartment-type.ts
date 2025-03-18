// types.ts
export interface Apartment {
  id: number;
  title: string;
  description: string;
  location: string;
  noRoom: string;
  noBathRoom: string;
  area: string; // to be replaced with area
  features: string[];
  price: number;
  availableFrom: string;
  availableTo: string;
  imageUrl: string;
  status: string;
  catagory: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

export interface ApartmentsState {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}
