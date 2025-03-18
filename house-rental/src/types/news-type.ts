// types.ts
export interface News {
  id: number;
  title: string;
  description: string;
  imageUrl: String;
  date: string;
}

export interface NewsState {
  newses: News[];
  loading: boolean;
  error: string | null;
}
