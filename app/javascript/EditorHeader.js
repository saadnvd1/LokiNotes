import React from "react";
import { Header } from "antd/es/layout/layout";
import useNotes from "hooks/useNotes";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

const EditorHeader = () => {
  const { currentNote } = useNotes();

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
          {currentNote?.title}
        </span>
      </div>
      <div style={{ marginTop: "10px", color: "#fff", cursor: "pointer" }}>
        <PencilSquareIcon height="32px" />
      </div>
    </Header>
  );
};

export default EditorHeader;
