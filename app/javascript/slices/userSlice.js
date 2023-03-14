import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "axiosInstance";

const initialState = {
  user: null,
};

export const checkLoggedIn = createAsyncThunk(
  "users/checkLoggedIn",
  async (thunkAPI) => {
    const response = await axiosI.get("/logged_in");
    return response.data;
  }
);

export const login = createAsyncThunk("users/login", async (data, thunkAPI) => {
  const response = await axiosI.post("/users/sign_in", { user: data });
  return response.data;
});

export const register = createAsyncThunk(
  "users/register",
  async (data, thunkAPI) => {
    const response = await axiosI.post("/users", { user: data });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkLoggedIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
