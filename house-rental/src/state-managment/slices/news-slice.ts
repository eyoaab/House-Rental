// newsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { News, NewsState } from "@/types/news-type";

// Async thunk to fetch news using Axios
export const fetchNews = createAsyncThunk<News[], void>(
  "news/fetchNews",
  async () => {
    const response = await axios.get(
      "https://house-rental-backend-tc9z.onrender.com/api/blogs/"
    );
    console.log(response.data);
    return response.data.blogs;
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
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
