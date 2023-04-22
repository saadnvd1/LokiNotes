import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "helpers/axiosInstance";

const initialState = {
  user: null,
};

export const checkLoggedIn = createAsyncThunk(
  "users/checkLoggedIn",
  async () => {
    const response = await axiosInstance.get("/logged_in");
    return response.data;
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  const response = await axiosInstance.patch("/users.json", { user: data });
  return response.data;
});

export const login = createAsyncThunk("users/login", async (data) => {
  const response = await axiosInstance.post("/users/sign_in", { user: data });
  return response.data;
});

export const register = createAsyncThunk("users/register", async (data) => {
  const response = await axiosInstance.post("/users", { user: data });
  return response.data;
});

export const logout = createAsyncThunk("users/logout", async () => {
  const response = await axiosInstance.delete("/users/sign_out.json");
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
    builder.addCase(logout.fulfilled, (state) => {
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
