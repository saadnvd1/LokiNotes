import React from "react";
import { Header } from "antd/es/layout/layout";

const EditorHeader = ({ currentNote }) => {
  return (
    <Header
      style={{
        padding: 0,
        display: "flex",
      }}
    >
      <span style={{ fontSize: "32px", marginLeft: 20, color: "#fff" }}>
        {currentNote?.title}
      </span>
    </Header>
  );
};

export default EditorHeader;
