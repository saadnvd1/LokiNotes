import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "slices/notesSlice";

const useNotes = () => {
  const dispatch = useDispatch();

  const {
    notesData,
    selectedNoteId,
    selectedNotebookId,
    selectedParentNotebookId,
    content,
  } = useSelector((state) => state.notes);

  const getCurrentNote = () => {
    const notebookNotes = getCurrentlySelectedNotebook();

    if (notebookNotes) {
      return notebookNotes.notes.find((note) => note.id === selectedNoteId);
    }
  };

  const getNotesForSelectedNotebook = () => {
    if (!notesData || !selectedNotebookId) return [];

    const notebookNotes = getCurrentlySelectedNotebook();

    if (notebookNotes) {
      return notebookNotes.notes.map((note) => ({
        key: note.id,
        label: note.title || "Untitled",
      }));
    }

    return [];
  };

  // -- Notebook Related Functions
  const getCurrentlySelectedNotebook = () => {
    if (!notesData) return;

    return getNotebookById(selectedNotebookId);
  };

  const getNotebookById = (id) => {
    if (selectedParentNotebookId) {
      return notesData[selectedParentNotebookId].subnotebooks[id];
    }

    return notesData[id];
  };

  return {
    currentNote: getCurrentNote(),
    selectedNotebookNotes: getNotesForSelectedNotebook(),
    selectedNoteId,
    selectedNotebookId,
    content,
    getNotebookById,
    notesData,
  };
};
export default useNotes;
