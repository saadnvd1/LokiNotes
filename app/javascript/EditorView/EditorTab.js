import { updateActiveIndex } from "slices/notesSlice";
import LBox from "components/LBox/LBox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById } from "selectors/notesSelector";

const EditorTab = ({ index, tab, activeIndex }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) =>
    selectNoteById(state, { noteId: tab.noteId })
  );

  return (
    <LBox onClick={() => dispatch(updateActiveIndex(index))}>
      <LBox
        className={`editor-tab ${
          activeIndex === index ? "editor-tab-selected" : ""
        }`}
      >
        {note.title || "Untitled"}
      </LBox>
    </LBox>
  );
};

export default EditorTab;
