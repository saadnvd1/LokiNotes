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
      timeout: 10000,
    });

    return response.data;
  }
);

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state, action) => {
      state.uploadingImages = true;
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.uploadingImages = false;
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.uploadingImages = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = imagesSlice.actions;

export default imagesSlice.reducer;
