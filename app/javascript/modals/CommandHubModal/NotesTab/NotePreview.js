import ReactQuill from "react-quill";
import React from "react";

const NotePreview = ({ content }) => {
  // TODO: it would be nice to highlight the search query within the note itself
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
