import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";
import axiosInstance from "helpers/axiosInstance";

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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data, thunkAPI) => {
    const response = await axiosI.patch("/users.json", { user: data });
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

export const logout = createAsyncThunk("users/logout", async (thunkAPI) => {
  const response = await axiosI.delete("/users/sign_out.json");
  return response.data;
});

const handleUserAuthSuccess = (state, action) => {
  state.user = action.payload.user;
  localStorage.setItem("lnt", action.payload.token);
  axiosInstance.defaults.headers.Authorization = `Bearer ${action.payload.token}`;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkLoggedIn.fulfilled, (state, action) => {
      handleUserAuthSuccess(state, action);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      handleUserAuthSuccess(state, action);
    });
    builder.addCase(register.fulfilled, (state, action) => {
      handleUserAuthSuccess(state, action);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      localStorage.removeItem("lnt");
      axiosInstance.defaults.headers.Authorization = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
