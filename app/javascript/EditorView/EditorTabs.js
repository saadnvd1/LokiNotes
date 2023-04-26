import React from "react";
import LBox from "components/LBox/LBox";
import "EditorView/EditorTabs.css";
import Editor from "EditorView/Editor";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveIndex } from "slices/notesSlice";

const EditorTabs = () => {
  const dispatch = useDispatch();
  const openTabs = useSelector((state) => state.notes.tabs.open);
  const activeIndex = useSelector((state) => state.notes.tabs.activeIndex);

  return (
    <LBox>
      <LBox
        flexRowStart
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        {openTabs.map((tab, index) => (
          <LBox
            onClick={() => dispatch(updateActiveIndex(index))}
            key={`${tab.noteId}-${index}-tab`}
          >
            <LBox
              className="editor-tab"
              style={{
                backgroundColor: `${index === activeIndex ? "red" : "white"}`,
              }}
            >
              Tab {index}
            </LBox>
          </LBox>
        ))}
      </LBox>
      {openTabs.map((tab, index) => (
        <LBox
          key={`${tab.noteId}-${index}-editor`}
          style={{ display: `${activeIndex === index ? "block" : "none"}` }}
        >
          {/* eslint-disable-next-line react/no-array-index-key */}
          <Editor noteId={tab.noteId} index={index} />
        </LBox>
      ))}
    </LBox>
  );
};

export default EditorTabs;
