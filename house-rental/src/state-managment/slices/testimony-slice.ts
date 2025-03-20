// testimonySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Testimony, TestimonyState } from "@/types/testimony-type";

// Async thunk to fetch testimony using Axios
export const fetchTestimonies = createAsyncThunk<Testimony[], void>(
  "testimony/fetchTestimonies",
  async () => {
    const response = await axios.get(
      "https://house-rental-backend-tc9z.onrender.com/api/testimony"
    );
    // console.log(response.data);
    return response.data.testimonies;
  }
);

const initialState: TestimonyState = {
  testimonies: [],
  loading: false,
  error: null,
};

const testimonySlice = createSlice({
  name: "testimony",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTestimonies.fulfilled,
        (state, action: PayloadAction<Testimony[]>) => {
          state.loading = false;
          state.testimonies = action.payload;
        }
      )
      .addCase(fetchTestimonies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimony";
      });
  },
});

export default testimonySlice.reducer;
