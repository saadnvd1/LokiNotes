import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notesReducer from "./slices/notesSlice";
import billingReducer from "./slices/billingSlice";
import modalsReducer from "./slices/modalSlice";
import imagesReducer from "./slices/imagesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    billing: billingReducer,
    modals: modalsReducer,
    images: imagesReducer,
  },
});
