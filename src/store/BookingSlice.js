import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingData: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.bookingData = action.payload;
    },
    clearBooking: (state) => {
      state.bookingData = null;
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
