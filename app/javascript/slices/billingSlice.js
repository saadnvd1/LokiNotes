import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  prices: [],
  isOnTrial: false,
  subscription: null,
  premium: null,
};

export const getBillingData = createAsyncThunk(
  "billing/getBillingData",
  async (thunkAPI) => {
    const response = await axiosI.get("/billing");
    return response.data;
  }
);

export const createSessionCheckout = createAsyncThunk(
  "billing/createSessionCheckout",
  async ({ priceId }, thunkAPI) => {
    const response = await axiosI.post("/billing/create_session_checkout", {
      price_id: priceId,
    });
    return response.data;
  }
);

export const checkSubscriptionStatus = createAsyncThunk(
  "billing/checkSubscriptionStatus",
  async (thunkAPI) => {
    const response = await axiosI.get("/billing/check_subscription_status");
    return response.data;
  }
);

export const getSubscription = createAsyncThunk(
  "billing/getSubscription",
  async (thunkAPI) => {
    const response = await axiosI.get("/billing/get_subscription");
    return response.data;
  }
);

export const createCustomerPortalSession = createAsyncThunk(
  "billing/createCustomerPortalSession",
  async (thunkAPI) => {
    const response = await axiosI.post(
      "/billing/create_customer_portal_session"
    );
    return response.data;
  }
);

export const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBillingData.fulfilled, (state, action) => {
      state.prices = action.payload.prices;
      state.premium = action.payload.premium;
    });
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.subscription = action.payload.subscription;
    });
    // builder.addCase(checkSubscriptionStatus.fulfilled, (state, action) => {
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
export const {} = billingSlice.actions;

export default billingSlice.reducer;
