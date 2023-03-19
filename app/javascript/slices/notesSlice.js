import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "axiosInstance";

const initialState = {
  notesData: null,
};

export const getNotesData = createAsyncThunk(
  "notes/getNotesData",
  async (thunkAPI) => {
    const response = await axiosI.get("/notes");
    return response.data;
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, content }, thunkAPI) => {
    const response = await axiosI.patch(`/notes/${noteId}`, {
      content: content,
    });
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
    builder.addCase(updateNote.fulfilled, (state, action) => {
      // Maybe later I'll use this for something, not sure
      console.log("note successfully saved!");
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = notesSlice.actions;

export default notesSlice.reducer;
