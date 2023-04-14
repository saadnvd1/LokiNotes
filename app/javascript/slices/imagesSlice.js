import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  uploadingImages: false,
};

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async (formData, thunkAPI) => {
    const response = await axiosI.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  }
);

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const {} = imagesSlice.actions;

export default imagesSlice.reducer;
