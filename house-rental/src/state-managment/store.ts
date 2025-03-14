// store.ts
import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./slices/apartments-slice";

const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
