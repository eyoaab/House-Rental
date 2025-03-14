// types.ts
export interface Apartment {
  id: number;
  title: string;
  description: string;
  location: string;
  noRoom: string;
  features: string[];
  price: number;
  availableFrom: string;
  availableTo: string;
  imageUrl: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
}

export interface ApartmentsState {
  apartments: Apartment[];
  loading: boolean;
  error: string | null;
}
