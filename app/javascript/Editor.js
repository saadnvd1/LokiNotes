import ReactQuill, { Quill } from "react-quill";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Content } from "antd/es/layout/layout";
import useNotes from "hooks/useNotes";
import { updateContent } from "slices/notesSlice";
import { useDispatch } from "react-redux";

const Editor = () => {
  const dispatch = useDispatch();
  const { selectedNoteId, content } = useNotes();

  // const imageUploader = (file, callback) => {
  //   console.log("file", file);
  // };

  const modules = useMemo(
    () => ({
      toolbar: {
        // TODO: implement image upload
        handlers: { image: () => console.log("hello") },
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

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
          modules={modules}
          key={selectedNoteId}
          value={content}
          onChange={(content, delta, source, editor) => {
            dispatch(updateContent(content));
          }}
          scrollingContainer=".editor-container"
          placeholder="Begin something amazing here..."
        />
      </div>
    </Content>
  );
};

export default Editor;
