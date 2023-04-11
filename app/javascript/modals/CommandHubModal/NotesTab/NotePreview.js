import ReactQuill from "react-quill";
import React from "react";

const NotePreview = ({ content }) => {
  return (
    <div style={{ marginTop: 8 }}>
      <ReactQuill
        modules={{
          toolbar: false,
        }}
        readOnly
        value={content}
        scrollingContainer=".editor-container"
      />
    </div>
  );
};

export default NotePreview;
