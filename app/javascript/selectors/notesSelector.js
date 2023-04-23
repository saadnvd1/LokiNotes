import { createSelector } from "reselect";
import { getNotebookById } from "helpers/notesHelper";

const selectNotesSlice = (state) => state.notes;
const selectSelectedNoteId = (state) => state.notes.selectedNoteId;
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
  [selectNotesData],
  (data) => {
    // Get all the notebook names, as well as all the subnotebook names
    const notebookNames = [];

    Object.values(data || []).forEach((notebook) => {
      notebookNames.push({ name: notebook.name, id: notebook.id });

      if (notebook.subnotebooks) {
        Object.values(notebook.subnotebooks).forEach((subnotebook) => {
          notebookNames.push({
            name: subnotebook.name,
            id: subnotebook.id,
            parentId: notebook.id,
          });
        });
      }
    });

    return notebookNames;
  }
);

export const selectAllNotes = createSelector(selectNotesData, (data) => {
  const notes = [];

  Object.values(data || []).forEach((notebook) => {
    if (notebook.notes) {
      notebook.notes.forEach((note) => {
        notes.push({
          title: note.title,
          id: note.id,
          notebookId: notebook.id,
          content: note.content,
          createdAt: note.created_at,
        });
      });
    }

    // TODO: This is duplicated from the above code. Refactor.
    if (notebook.subnotebooks) {
      Object.values(notebook.subnotebooks).forEach((subnotebook) => {
        if (subnotebook.notes) {
          subnotebook.notes.forEach((note) => {
            notes.push({
              title: note.title,
              id: note.id,
              notebookId: subnotebook.id,
              content: note.content,
              parentNotebookId: notebook.id,
              createdAt: note.created_at,
            });
          });
        }
      });
    }
  });

  return notes;
});

export const selectCurrentNotebook = createSelector(selectNotesSlice, (data) =>
  getNotebookById(
    data.selectedParentNotebookId,
    data.notesData,
    data.selectedNotebookId
  )
);

export const selectCurrentNoteTitleAndId = createSelector(
  selectCurrentNotebook,
  selectSelectedNoteId,
  (notebook, selectedNoteId) => {
    if (notebook) {
      const note = notebook.notes.find((note) => note.id === selectedNoteId);

      if (note) {
        return { title: note.title, id: note.id };
      }
    }
  }
);

export const selectNoteById = createSelector(
  selectAllNotes,
  (state, props) => props.noteId,
  (notes, noteId) => {
    const note = notes.find((n) => n.id === noteId);
    return note;
  }
);
