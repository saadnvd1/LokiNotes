import ReactQuill from "react-quill";
import React from "react";
import { Content } from "antd/es/layout/layout";

const Editor = ({ selectedNoteId, content, setContent }) => {
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: "0px",
        overflowY: "scroll",
      }}
      className="editor-container" // prevents scrolling jump issue for quill.js
    >
      <div style={{ backgroundColor: "white", color: "black" }}>
        <ReactQuill
          ref={(node) => {
            // Oh my God, this took forever to figure out, but the reason wasn't that this code was wrong, but because the "key" wasn't set to a unique key, so it kept re-using the old DOM's value I think. After setting a key, this code finally ended up working. thank GOD!
            if (node != null) {
              const len = node.unprivilegedEditor.getLength();
              const selection = { index: len, length: len };
              node.setEditorSelection(node.editor, selection);
            }
          }}
          key={selectedNoteId}
          value={content}
          onChange={(content, delta, source, editor) => {
            setContent(content);
          }}
          placeholder="Begin something amazing here..."
          scrollingContainer=".editor-container"
        />
      </div>
    </Content>
  );
};

export default Editor;
