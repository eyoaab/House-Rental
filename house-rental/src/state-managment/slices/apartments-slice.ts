// apartmentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Apartment, ApartmentsState } from "../../types/apartment-type";

// Async thunk to fetch apartments
export const fetchApartments = createAsyncThunk<Apartment[], void>(
  "apartments/fetchApartments",
  async () => {
    const response = await fetch(
      "https://house-rental-backend-tc9z.onrender.com/api/apartments"
    );
    const data = await response.json();
    return data;
  }
);

const initialState: ApartmentsState = {
  apartments: [],
  loading: false,
  error: null,
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchApartments.fulfilled,
        (state, action: PayloadAction<Apartment[]>) => {
          state.loading = false;
          state.apartments = action.payload;
        }
      )
      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch apartments";
      });
  },
});

export default apartmentsSlice.reducer;
