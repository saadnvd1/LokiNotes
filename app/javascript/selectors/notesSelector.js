import { createSelector } from "reselect";

const selectNotesData = (state) => state.notes.notesData;

export const selectNotebooksSearchIndex = createSelector(
  [selectNotesData],
  (data) => {
    const searchableData = {};

    Object.values(data || []).forEach((notebook) => {
      // Add the notebook to the searchable data with its name and id
      searchableData[notebook.id] = {
        id: notebook.id,
        name: notebook.name,
        type: "notebook",
      };

      // Add each note in the notebook to the searchable data with its title and id
      notebook.notes.forEach((note) => {
        searchableData[note.id] = {
          id: note.id,
          name: note.title,
          notebookId: notebook.id,
          type: "note",
        };
      });

      // Recursively add each subnotebook in the notebook to the searchable data
      const addSubnotebooks = (subnotebooks, parentId) => {
        Object.values(subnotebooks).forEach((subnotebook) => {
          searchableData[subnotebook.id] = {
            id: subnotebook.id,
            name: subnotebook.name,
            parentId,
            type: "subnotebook",
          };
          if (subnotebook.subnotebooks) {
            addSubnotebooks(subnotebook.subnotebooks, subnotebook.id);
          }
        });
      };

      if (notebook.subnotebooks) {
        addSubnotebooks(notebook.subnotebooks, notebook.id);
      }
    });

    return Object.values(searchableData);
  }
);
