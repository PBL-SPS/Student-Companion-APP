import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AppearanceType = "SYSTEM_PREF" | "LIGHT" | "DARK";

interface SettingsState {
  appearance: AppearanceType;
}

const initialState: SettingsState = {
  appearance: "SYSTEM_PREF",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAppearance: (state, action: PayloadAction<AppearanceType>) => {
      state.appearance = action.payload;
      return state;
    },
  },
});

export const { setAppearance } = settingsSlice.actions;

export default settingsSlice.reducer;
