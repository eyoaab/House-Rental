import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIndex: 0,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
  },
});

export const { setSelectedIndex } = navSlice.actions;
export default navSlice.reducer;
