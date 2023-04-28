import React from "react";
import LBox from "components/LBox/LBox";
import "EditorView/EditorTabs.css";
import Editor from "EditorView/Editor";
import { useDispatch, useSelector } from "react-redux";
import { createNote, addTab } from "slices/notesSlice";
import EditorTab from "EditorView/EditorTab";

const EditorTabs = () => {
  const dispatch = useDispatch();
  const openTabs = useSelector((state) => state.notes.tabs.open);
  const activeIndex = useSelector((state) => state.notes.tabs.activeIndex);
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );

  const handleAddTab = () => {
    dispatch(createNote({ notebookId: selectedNotebookId }))
      .unwrap()
      .then((res) => {
        dispatch(addTab({ noteId: res.note.id }));
      });
  };

  return (
    <LBox>
      <LBox flexRowStart className="editor-tab-bar">
        {openTabs.map((tab, index) => (
          <EditorTab
            key={`${tab.noteId}-tab`}
            index={index}
            tab={tab}
            activeIndex={activeIndex}
            numOfTabs={openTabs.length}
          />
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
