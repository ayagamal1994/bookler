import { createSlice } from "@reduxjs/toolkit";

const storedBooking = JSON.parse(localStorage.getItem("mybooking")) || [];

const initialState = {
  bookingData: Array.isArray(storedBooking) ? storedBooking : [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      const newBooking = action.payload;

      const exists = state.bookingData.some(
        (b) =>
          b.id === newBooking.id &&
          b.checkin === newBooking.checkin &&
          b.checkout === newBooking.checkout
      );

      if (!exists) {
        state.bookingData.push(newBooking);
        localStorage.setItem("mybooking", JSON.stringify(state.bookingData));
      }
    },

    removeBooking: (state, action) => {
      const index = action.payload;
      state.bookingData.splice(index, 1);
      localStorage.setItem("mybooking", JSON.stringify(state.bookingData));
    },
  },
});

export const { setBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
