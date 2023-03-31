import React from "react";
import { Header } from "antd/es/layout/layout";
import useNotes from "hooks/useNotes";
import { useDispatch } from "react-redux";
import { createNote } from "slices/notesSlice";
import LIcon from "components/LIcon/LIcon";

const EditorHeader = () => {
  const { currentNote, selectedNotebookId } = useNotes();
  const dispatch = useDispatch();

  const handleCreateNote = () => {
    dispatch(createNote({ notebookId: selectedNotebookId }));
  };

  return (
    <Header
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: "25px",
        paddingLeft: "25px",
        alignItems: "center",
      }}
    >
      <div>
        <span style={{ fontSize: "32px", color: "#fff" }}>
          {currentNote?.title || "Untitled"}
        </span>
      </div>
      <div style={{ color: "#fff", cursor: "pointer" }}>
        <LIcon
          onClick={handleCreateNote}
          iconName="pencilSquareIcon"
          tooltipText="Create Note"
        />
      </div>
    </Header>
  );
};

export default EditorHeader;
