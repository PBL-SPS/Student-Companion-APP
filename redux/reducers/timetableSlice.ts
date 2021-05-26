import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timetable } from "../../screens/TimetableScreen";

// Define a type for the slice state
interface TimetableState {
  timetable: Timetable | null;
}

// Define the initial state using that type
const initialState: TimetableState = {
  timetable: null,
};

export const timetableSlice = createSlice({
  name: "timetable",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTimetable: (state, action: PayloadAction<Timetable>) => {
      state.timetable = action.payload;
      return state;
    },
  },
});

export const { addTimetable } = timetableSlice.actions;

export default timetableSlice.reducer;
