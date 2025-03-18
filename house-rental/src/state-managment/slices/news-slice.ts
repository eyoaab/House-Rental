// newsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { News, NewsState } from "@/types/news-type";

// Async thunk to fetch news
export const fetchNews = createAsyncThunk<News[], void>(
  "news/fetchNews",
  async () => {
    const response = await fetch(
      "https://house-rental-backend-tc9z.onrender.com/api/blog"
    );
    const data = await response.json();
    return data;
  }
);

const initialState: NewsState = {
  newses: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading = false;
        state.newses = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch apartments";
      });
  },
});

export default newsSlice.reducer;
