import {
  updateSelectedNotebookId,
  updateSelectedNoteId,
} from "slices/notesSlice";
import { useDispatch } from "react-redux";

const useGoToNote = () => {
  const dispatch = useDispatch();

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

  return [goToNote];
};

export default useGoToNote;
