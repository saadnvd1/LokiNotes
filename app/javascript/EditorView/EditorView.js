import React, { useEffect, useMemo, useRef, useState } from "react";
import EditorHeader from "EditorView/EditorHeader";
import "./Resizer.css";
import { useSelector } from "react-redux";
import EditorTabs from "EditorView/EditorTabs";

const EditorView = () => {
  const notes = useSelector((state) => state.notes.notes);

  // // This useEffect is for when we update our notes, we want to make sure the URL reflects that so that if the user wants to save that to bookmarks, they can easily access it again
  // useEffect(() => {
  //   if (selectedNoteId || selectedNotebookId) {
  //     navigate(getRedirectUrl(selectedNoteId, selectedNotebookId));
  //   }
  // }, [navigate, selectedNoteId, selectedNotebookId]);

  if (!notes) {
    return null;
  }

  return (
    <div style={{ overflowY: "scroll", width: "100vw" }} id="editor-container">
      <EditorHeader />
      <div style={{ margin: 10 }}>
        <EditorTabs />
      </div>
    </div>
  );
};

export default EditorView;
