import React from "react";
import LBox from "components/LBox/LBox";
import "EditorView/EditorTabs.css";
import Editor from "EditorView/Editor";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateActiveIndex } from "slices/notesSlice";

const EditorTabs = () => {
  const dispatch = useDispatch();
  const openTabs = useSelector((state) => state.notes.tabs.open);
  const activeIndex = useSelector((state) => state.notes.tabs.activeIndex);
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );

  const handleAddTab = () => {
    dispatch(createNote({ notebookId: selectedNotebookId }));
  };

  return (
    <LBox>
      <LBox flexRowStart className="editor-tab-bar">
        {openTabs.map((tab, index) => (
          <LBox
            onClick={() => dispatch(updateActiveIndex(index))}
            key={`${tab.noteId}-tab`}
          >
            <LBox
              className={`editor-tab ${
                activeIndex === index ? "editor-tab-selected" : ""
              }`}
            >
              Tab {index}
            </LBox>
          </LBox>
        ))}
        <LBox onClick={handleAddTab}>
          <LBox className="editor-tab">+</LBox>
        </LBox>
      </LBox>
      {openTabs.map((tab, index) => (
        <LBox
          key={`${tab.noteId}-editor`}
          style={{ display: `${activeIndex === index ? "block" : "none"}` }}
        >
          <Editor noteId={tab.noteId} />
        </LBox>
      ))}
    </LBox>
  );
};

export default EditorTabs;
