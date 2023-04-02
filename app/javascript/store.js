import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";
import billingReducer from "./slices/billingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    billing: billingReducer,
  },
});
