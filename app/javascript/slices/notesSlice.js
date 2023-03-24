import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosI from "axiosInstance";

const initialState = {
  notesData: null,
  selectedNoteId: null,
  selectedCategoryId: null,
  isCreatingCategory: null,
  content: null,
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

export const createCategory = createAsyncThunk(
  "notes/createCategory",
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
  reducers: {
    updateSelectedNoteId: (state, action) => {
      state.selectedNoteId = action.payload;
    },
    updateSelectedCategoryId: (state, action) => {
      state.selectedCategoryId = action.payload;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
    toggleIsCreatingCategory: (state) => {
      state.isCreatingCategory = !state.isCreatingCategory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotesData.fulfilled, (state, action) => {
      state.notesData = action.payload.notes_data;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      // Maybe later I'll use this for something, not sure
      let note = state.notesData[action.payload.note.category_id].notes.find(
        (note) => note.id === action.payload.note.id
      );

      note.content = action.payload.note.content;
      console.log("note successfully saved!");
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleIsCreatingCategory,
  updateContent,
  updateSelectedCategoryId,
  updateSelectedNoteId,
} = notesSlice.actions;

export default notesSlice.reducer;
