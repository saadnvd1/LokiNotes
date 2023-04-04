import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";
import axiosInstance from "helpers/axiosInstance";

const initialState = {
  prices: [],
  billingModalIsOpen: false,
  billingSuccessModalIsOpen: false,
  isOnTrial: false,
};

export const getBillingData = createAsyncThunk(
  "modals/getBillingData",
  async (thunkAPI) => {
    const response = await axiosI.get("/billing");
    return response.data;
  }
);

export const createSessionCheckout = createAsyncThunk(
  "modals/createSessionCheckout",
  async ({ priceId }, thunkAPI) => {
    const response = await axiosI.post("/billing/create_session_checkout", {
      price_id: priceId,
    });
    return response.data;
  }
);

export const createSubscription = createAsyncThunk(
  "modals/createSubscription",
  async ({ checkoutSessionId }, thunkAPI) => {
    const response = await axiosI.post("/billing/success", {
      checkout_session_id: checkoutSessionId,
    });
    return response.data;
  }
);

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    toggleBillingModal: (state) => {
      state.billingModalIsOpen = !state.billingModalIsOpen;
    },
    toggleBillingSuccessModal: (state) => {
      state.billingSuccessModalIsOpen = !state.billingSuccessModalIsOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBillingData.fulfilled, (state, action) => {
      state.prices = action.payload.prices;
      state.isOnTrial = action.payload.is_on_trial;
    });
    // builder.addCase(createSubscription.fulfilled, (state, action) => {
    //   state.prices = action.payload.prices;
    // });
    // builder.addCase(login.fulfilled, (state, action) => {
    //   handleUserAuthSuccess(state, action);
    // });
    // builder.addCase(register.fulfilled, (state, action) => {
    //   handleUserAuthSuccess(state, action);
    // });
  },
});

// Action creators are generated for each case reducer function
export const { toggleBillingModal, toggleBillingSuccessModal } =
  billingSlice.actions;

export default billingSlice.reducer;
