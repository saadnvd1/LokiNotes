import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosI from "helpers/axiosInstance";

const initialState = {
  notesData: null,
  selectedNoteId: null,
  selectedNotebookId: null,
  isCreatingNotebook: null,
  content: null,
  selectedParentNotebookId: null,
  isSavingNote: false,
};

// -- Notes Related Functionality
export const getNotesData = createAsyncThunk(
  "notes/getNotesData",
  async (thunkAPI) => {
    const response = await axiosI.get("/notes");
    return response.data;
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ notebookId }, thunkAPI) => {
    const response = await axiosI.post(`/notes`, { notebook_id: notebookId });
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

export const updateSelectedNoteId = createAsyncThunk(
  "notes/updateSelectedNoteId",
  async ({ noteId }, thunkAPI) => {
    await _saveCurrentNote(thunkAPI);

    return noteId;
  }
);

// Business logic for whether we want to save the note to the database or not
// In most cases, we just shouldn't save a note at all if it hasn't changed
const _shouldSaveNote = (thunkAPI, noteId) => {
  const notesState = thunkAPI.getState().notes;
  const content = notesState.content;

  let note = _findNoteInNotebook(
    notesState,
    notesState.selectedNotebookId,
    noteId
  );

  // Do not save the note if content hasn't changed
  if (note && note.content === content) return false;

  return true;
};

const _findNoteInNotebook = (state, notebookId, noteId) => {
  if (state.selectedParentNotebookId) {
    return state.notesData[state.selectedParentNotebookId].subnotebooks[
      state.selectedNotebookId
    ].notes.find((note) => note.id === noteId);
  }

  return state.notesData[notebookId]?.notes?.find((note) => note.id === noteId);
};

// This is an internal function that will setup and dispatch the actual action to update a note
// It's meant to be used within other async thunks in case we want to save the current note
// before doing something else
const _saveCurrentNote = (thunkAPI) => {
  const notesState = thunkAPI.getState().notes;
  const selectedNoteId = notesState.selectedNoteId;
  const content = notesState.content;

  // Once the note is updated, then we change notebooks
  if (selectedNoteId) {
    return thunkAPI.dispatch(updateNote({ noteId: selectedNoteId, content }));
  }
};

// -- NotebooksTab Related Functionality
const _findNotebook = (state, notebookId, parentNotebookId = null) => {
  if (parentNotebookId) {
    return state.notesData[parentNotebookId].subnotebooks[notebookId];
  }

  return state.notesData[notebookId];
};

const _findParentNotebookId = (state, notebookId) => {
  if (state.notesData[notebookId]) {
    return null; // not a subnotebook
  }

  for (const [parentId, data] of Object.entries(state.notesData)) {
    const parentNotebookId = Number(parentId);
    if (data.subnotebooks[notebookId]) {
      return parentNotebookId;
    }
  }
};

export const updateSelectedNotebookId = createAsyncThunk(
  "notes/updateSelectedNotebookId",
  async ({ notebookId }, thunkAPI) => {
    await _saveCurrentNote(thunkAPI);

    return notebookId;
  }
);

export const createNotebook = createAsyncThunk(
  "notes/createNotebook",
  async ({ name, parentId }, thunkAPI) => {
    const response = await axiosI.post(`/notebooks`, {
      name,
      parent_id: parentId,
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
    toggleIsCreatingNotebook: (state) => {
      state.isCreatingNotebook = !state.isCreatingNotebook;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateSelectedNoteId.fulfilled, (state, action) => {
      state.selectedNoteId = action.payload;

      let note = _findNoteInNotebook(
        state,
        state.selectedNotebookId,
        action.payload
      );

      if (!note) return;

      // Make sure to update content when we change to another note
      state.content = note.content;
    });
    builder.addCase(updateSelectedNotebookId.fulfilled, (state, action) => {
      const notebookId = action.payload;
      state.selectedNotebookId = notebookId;

      // Also make sure we keep track of the parent notebook ID
      const parentNotebookId = _findParentNotebookId(state, notebookId);
      state.selectedParentNotebookId = parentNotebookId;

      // By default we should select the first note in that notebook
      let firstNote = state.notesData[notebookId]?.notes[0];

      if (parentNotebookId) {
        firstNote =
          state.notesData[parentNotebookId].subnotebooks[notebookId].notes[0];
      }

      if (firstNote) {
        state.selectedNoteId = firstNote.id;
        state.content = firstNote.content;
      } else {
        // When we have no notes in the existing notebook yet
        state.selectedNoteId = null;
        state.content = null;
      }
    });
    builder.addCase(getNotesData.fulfilled, (state, action) => {
      state.notesData = action.payload.notes_data;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.isSavingNote = false;
      let note = _findNoteInNotebook(
        state,
        action.payload.note.notebook_id,
        action.payload.note.id
      );

      if (!note) return;

      note.content = action.payload.note.content;
    });
    builder.addCase(updateNote.pending, (state, action) => {
      state.isSavingNote = true;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.isSavingNote = false;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      const noteId = action.payload.note.id;

      const notebook = _findNotebook(
        state,
        action.payload.note.notebook_id,
        action.payload.parent_notebook_id
      );

      notebook.notes.push(action.payload.note);
      state.content = null;
      state.selectedNoteId = noteId;
    });
    builder.addCase(createNotebook.fulfilled, (state, action) => {
      // Add new notebook to notesData
      const parentId = action.meta.arg.parentId;

      if (parentId) {
        // subnotebook
        const parentNotebook = _findNotebook(state, parentId);
        parentNotebook.subnotebooks[action.payload.id] = { ...action.payload };
        state.selectedParentNotebookId = parentId;
      } else {
        // main notebook
        state.notesData[action.payload.id] = { ...action.payload };
        state.selectedParentNotebookId = null;
      }

      state.selectedNotebookId = action.payload.id;
      state.selectedNoteId = null;
      state.content = null;
    });
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsCreatingNotebook, updateContent } = notesSlice.actions;

export default notesSlice.reducer;
