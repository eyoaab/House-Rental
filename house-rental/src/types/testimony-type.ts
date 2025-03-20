// types.ts
export interface Testimony {
  id: number;
  name: string;
  description: string;
  rate: number;
  imageUrl: string;
}

export interface TestimonyState {
  testimonies: Testimony[];
  loading: boolean;
  error: string | null;
}
