import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  uploadingImages: false,
};

export const uploadImage = createAsyncThunk(
  "images/uploadImage",
  async ({ file, noteId }, thunkAPI) => {
    const response = await axiosI.post("/images", { file, noteId });
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
