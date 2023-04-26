import { createSelector } from "reselect";
import { getNotebookById } from "helpers/notesHelper";

const selectNotesSlice = (state) => state.notes;
export const selectAllNotes = (state) => state.notes.notes;
const selectAllNotebooks = (state) => state.notes.notebooks;
const selectSelectedNoteId = (state) => state.notes.selectedNoteId;
const selectSelectedNotebokId = (state) => state.notes.selectedNotebookId;
const selectNotesData = (state) => state.notes.notesData;

const buildNotebookData = (notebook, searchableData, parentId = null) => {
  if (!notebook) return;

  searchableData[notebook.id] = {
    id: notebook.id,
    name: notebook.name,
    type: parentId ? "subnotebook" : "notebook",
    parentId,
  };

  // Add each note in the notebook to the searchable data with its title and id
  if (notebook.notes) {
    notebook.notes.forEach((note) => {
      searchableData[note.id] = {
        id: note.id,
        name: note.title,
        notebookId: notebook.id,
        type: "note",
      };
    });
  }

  if (notebook.subnotebooks) {
    Object.values(notebook.subnotebooks).forEach((subnotebook) => {
      buildNotebookData(subnotebook, searchableData, notebook.id);
    });
  }
};

const buildSearchableData = (data, searchableData) => {
  Object.values(data || []).forEach((notebook) => {
    buildNotebookData(notebook, searchableData);
  });
};

export const selectNotebooksSearchIndex = createSelector(
  [selectNotesData],
  (data) => {
    const searchableData = {};

    buildSearchableData(data, searchableData);

    return Object.values(searchableData);
  }
);

export const selectAllNotebookNameAndIds = createSelector(
  selectAllNotebooks,
  (notebooks) => {
    // Get all the notebook names, as well as all the subnotebook names
    const notebookNames = [];

    Object.values(notebooks || []).forEach((notebook) => {
      notebookNames.push({
        name: notebook.name,
        id: notebook.id,
        parentId: notebook.parent_notebook_id,
      });
    });

    return notebookNames;
  }
);

export const selectCurrentNoteTitleAndId = createSelector(
  selectAllNotes,
  selectSelectedNoteId,
  (notes, selectedNoteId) => {
    if (!selectedNoteId) return;
    const currentNote = notes[selectedNoteId];

    return {
      title: currentNote.title,
      id: currentNote.id,
    };
  }
);

export const selectNoteById = createSelector(
  selectAllNotes,
  (state, props) => props.noteId,
  (notes, noteId) => {
    return notes[noteId];
  }
);
