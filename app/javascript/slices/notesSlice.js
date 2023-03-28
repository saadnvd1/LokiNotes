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
    if (!_shouldSaveNote(thunkAPI, noteId)) return thunkAPI.rejectWithValue({});

    const response = await axiosI.patch(`/notes/${noteId}`, {
      content: content,
    });
    return response.data;
  }
);

// Business logic for whether we want to save the note to the database or not
// In most cases, we just shouldn't save a note at all if it hasn't changed
const _shouldSaveNote = (thunkAPI, noteId) => {
  const notesState = thunkAPI.getState().notes;
  const content = notesState.content;

  let note = _findNoteInCategory(
    notesState,
    notesState.selectedCategoryId,
    noteId
  );

  // Do not save the note if content hasn't changed
  if (note && note.content === content) return false;

  return true;
};

// This is an internal function that will setup and dispatch the actual action to update a note
// It's meant to be used within other async thunks in case we want to save the current note
// before doing something else
const _saveCurrentNote = (thunkAPI) => {
  const notesState = thunkAPI.getState().notes;
  const selectedNoteId = notesState.selectedNoteId;
  const content = notesState.content;

  // Once the note is updated, then we change categories
  if (selectedNoteId) {
    return thunkAPI.dispatch(updateNote({ noteId: selectedNoteId, content }));
  }
};

const _findNoteInCategory = (state, categoryId, noteId) => {
  return state.notesData[categoryId]?.notes?.find((note) => note.id === noteId);
};

export const updateSelectedCategoryId = createAsyncThunk(
  "notes/updateSelectedCategoryId",
  async ({ categoryId }, thunkAPI) => {
    await _saveCurrentNote(thunkAPI);

    return categoryId;
  }
);

export const updateSelectedNoteId = createAsyncThunk(
  "notes/updateSelectedNoteId",
  async ({ noteId }, thunkAPI) => {
    await _saveCurrentNote(thunkAPI);

    return noteId;
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
    updateContent: (state, action) => {
      state.content = action.payload;
    },
    toggleIsCreatingCategory: (state) => {
      state.isCreatingCategory = !state.isCreatingCategory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSelectedNoteId.fulfilled, (state, action) => {
      state.selectedNoteId = action.payload;

      let note = _findNoteInCategory(
        state,
        state.selectedCategoryId,
        action.payload
      );

      if (!note) return;

      // Make sure to update content when we change to another note
      state.content = note.content;
    });
    builder.addCase(updateSelectedCategoryId.fulfilled, (state, action) => {
      state.selectedCategoryId = action.payload;

      // By default we should select the first note in that category
      // Always select the first note from that category
      let firstNote = state.notesData[action.payload]?.notes[0];
      if (firstNote) {
        state.selectedNoteId = firstNote.id;
        state.content = firstNote.content;
      } else {
        // When we have no notes in the existing category yet
        state.selectedNoteId = null;
        state.content = null;
      }
    });
    builder.addCase(getNotesData.fulfilled, (state, action) => {
      state.notesData = action.payload.notes_data;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      let note = _findNoteInCategory(
        state,
        action.payload.note.category_id,
        action.payload.note.id
      );

      if (!note) return;

      note.content = action.payload.note.content;
    });
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsCreatingCategory, updateContent } = notesSlice.actions;

export default notesSlice.reducer;
