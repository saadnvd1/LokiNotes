import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "slices/notesSlice";

const useNotes = () => {
  const dispatch = useDispatch();

  const { notesData, selectedNoteId, selectedCategoryId, content } =
    useSelector((state) => state.notes);

  // -- Not Related Functions
  // When you navigate away to another category or note, we always want to save the note
  const saveNote = (noteId, content) => {
    dispatch(
      updateNote({
        noteId,
        content,
      })
    );
  };

  const saveCurrentNoteBeforeExit = () => {
    saveNote(selectedNoteId, content);
  };

  const getCurrentNote = () => {
    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.find((note) => note.id === selectedNoteId);
    }
  };

  const getNotesForSelectedCategory = () => {
    if (!notesData || !selectedCategoryId) return [];

    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.map((note) => ({
        key: note.id,
        label: note.title,
      }));
    }

    return [];
  };

  // -- Category Related Functions
  const getCurrentlySelectedCategory = () => {
    if (!notesData) return;

    return getCategoryById(selectedCategoryId);
  };

  const getCategoryById = (id) => {
    return notesData[id];
  };

  return {
    currentNote: getCurrentNote(),
    saveNote,
    selectedCategoryNotes: getNotesForSelectedCategory(),
    selectedNoteId,
    selectedCategoryId,
    content,
    saveCurrentNoteBeforeExit,
    getCategoryById,
    notesData,
  };
};
export default useNotes;
