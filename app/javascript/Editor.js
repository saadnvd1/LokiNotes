import ReactQuill from "react-quill";
import React, { useEffect, useRef, useState } from "react";
import { Content } from "antd/es/layout/layout";
import useNotes from "hooks/useNotes";
import { updateContent } from "slices/notesSlice";
import { useDispatch } from "react-redux";

const Editor = () => {
  const dispatch = useDispatch();
  const { selectedNoteId, content } = useNotes();

  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: "0px",
        overflowY: "scroll",
      }}
      className="editor-container" // prevents scrolling jump issue for quill.js
    >
      <div style={{ backgroundColor: "#181818", color: "white", border: 0 }}>
        <ReactQuill
          ref={(node) => {
            // Oh my God, this took forever to figure out, but the reason wasn't that this code was wrong, but because the "key" wasn't set to a unique key, so it kept re-using the old DOM's value I think. After setting a key, this code finally ended up working. thank GOD!
            // if (node != null) {
            //   const len = node.unprivilegedEditor.getLength();
            //   const selection = { index: len, length: len };
            //   node.setEditorSelection(node.editor, selection);
            // }
            // Removing the above code since I don't think we want this functionality for now
          }}
          // TODO: fix bug where this isn't working with the new flow now
          // I think it's because `selectedNoteId` on the second render isn't unique...
          key={selectedNoteId}
          value={content}
          onChange={(content, delta, source, editor) => {
            dispatch(updateContent(content));
          }}
          placeholder="Begin something amazing here..."
          scrollingContainer=".editor-container"
        />
      </div>
    </Content>
  );
};

export default Editor;
