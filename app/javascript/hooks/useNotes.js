import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNote,
  updateSelectedNotebookId,
  updateSelectedNoteId,
} from "slices/notesSlice";
import { DocumentIcon } from "@heroicons/react/24/solid";

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
        icon: <DocumentIcon height="16px" />,
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

  const goToNote = (notebookId, noteId) => {
    if (notebookId) {
      dispatch(
        updateSelectedNotebookId({ notebookId: Number(notebookId) })
      ).then(() => {
        if (noteId) {
          dispatch(updateSelectedNoteId({ noteId: Number(noteId) }));
        }
      });
    }
  };

  return {
    currentNote: getCurrentNote(),
    selectedNotebookNotes: getNotesForSelectedNotebook(),
    selectedNoteId,
    selectedNotebookId,
    content,
    getNotebookById,
    notesData,
    goToNote,
  };
};
export default useNotes;
