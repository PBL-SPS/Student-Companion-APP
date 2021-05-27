import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WhatsNew } from "../../screens/WhatsNewScreen";

interface WhatsNewState {
  whatsnew: WhatsNew[];
}

const initialState: WhatsNewState = {
  whatsnew: [],
};

export const whatsnewSlice = createSlice({
  name: "whatsnew",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getWhatsNew: (state, action: PayloadAction<WhatsNew[]>) => {
      state.whatsnew = action.payload;
      return state;
    },
  },
});

export const { getWhatsNew } = whatsnewSlice.actions;

export default whatsnewSlice.reducer;
