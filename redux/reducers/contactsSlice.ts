import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../screens/ContactScreen";

// Define a type for the slice state
interface ContactsState {
  contacts: Contact[];
}

// Define the initial state using that type
const initialState: ContactsState = {
  contacts: [],
};

export const contactSlice = createSlice({
  name: "contact",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
      return state;
    },
  },
});

export const { addContacts } = contactSlice.actions;

export default contactSlice.reducer;
