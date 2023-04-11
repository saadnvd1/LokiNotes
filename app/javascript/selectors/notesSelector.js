import { createSelector } from "reselect";

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
