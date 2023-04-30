import {
  removeTab,
  updateActiveIndex,
  updateSelectedNoteId,
} from "slices/notesSlice";
import LBox from "components/LBox/LBox";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNoteById } from "selectors/notesSelector";
import { XMarkIcon } from "@heroicons/react/24/outline";

const EditorTab = ({ index, tab, activeIndex, numOfTabs }) => {
  const dispatch = useDispatch();
  const note = useSelector((state) =>
    selectNoteById(state, { noteId: tab.noteId })
  );

  const handleChangeTab = () => {
    dispatch(updateActiveIndex({ index, noteId: tab.noteId }));
  };

  const handleCloseTab = (e) => {
    e.stopPropagation();
    dispatch(removeTab({ noteId: tab.noteId }));
  };

  return (
    <LBox onClick={handleChangeTab}>
      <LBox
        flexRowBetween
        className={`editor-tab ${
          activeIndex === index ? "editor-tab-selected" : ""
        }`}
      >
        <LBox
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {note.title || "Untitled"}
        </LBox>
        {numOfTabs > 1 && (
          <LBox ml8 onClick={handleCloseTab}>
            <XMarkIcon height="12" />
          </LBox>
        )}
      </LBox>
    </LBox>
  );
};

export default EditorTab;
