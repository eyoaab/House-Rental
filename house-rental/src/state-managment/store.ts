// store.ts
import { configureStore } from "@reduxjs/toolkit";
import apartmentsReducer from "./slices/apartments-slice";
import newsReducer from "./slices/news-slice";
import userReducer from "./slices/user-slice";
import testimoneyReducer from "./slices/testimony-slice";

const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
    news: newsReducer,
    user: userReducer,
    testimony: testimoneyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
