import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  departmentId: number;
  department: string;
  batchId: number;
  batch: string;
  yearId: number;
  year: string;
  divisionId: number;
  division: string;
  access_token: string;
  refresh_token: string;
}

// Define the initial state using that type
const initialState: AuthState | null = null;

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAuthData: (state, action: PayloadAction<AuthState | null>) => {
      state = action.payload;
      return state;
    },
    addTokens: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
      return state;
    },
  },
});

export const { addAuthData, addTokens } = authSlice.actions;

export default authSlice.reducer;
