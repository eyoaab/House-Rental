// types.ts
export interface Testimony {
  id: number;
  name: string;
  description: string;
  rate: number;
  imageUrl: string;
  creatorId: string;
}

export interface TestimonyState {
  testimonies: Testimony[];
  loading: boolean;
  error: string | null;
}
