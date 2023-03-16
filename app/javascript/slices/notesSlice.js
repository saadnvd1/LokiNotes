import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "axiosInstance";

const initialState = {
  notesData: null,
};

export const getNotesData = createAsyncThunk(
  "users/getNotesData",
  async (thunkAPI) => {
    const response = await axiosI.get("/notes");
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotesData.fulfilled, (state, action) => {
      state.notesData = action.payload.notes_data;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = notesSlice.actions;

export default notesSlice.reducer;
