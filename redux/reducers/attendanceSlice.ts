import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Attendance } from "../../screens/MISDetailsScreen";

const initialState: Attendance | null = null;

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    addMISDetails: (
      state,
      action: PayloadAction<{ misId: String; misPassword: String }>
    ) => {
      state = {
        ...state,
        formDetails: {
          misId: action.payload.misId,
          misPassword: action.payload.misPassword,
        },
      };
      return state;
    },
    addAttendanceData: (state, action: PayloadAction<Attendance | null>) => {
      state = {
        ...state,
        attendance: action.payload.attendance,
        totalAverage: action.payload.totalAverage,
      };
      return state;
    },
  },
});

export const { addMISDetails, addAttendanceData } = attendanceSlice.actions;

export default attendanceSlice.reducer;
