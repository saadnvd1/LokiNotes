import { Layout } from "antd";
import React, { useEffect, useRef } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import {
  getNotesData,
  toggleIsCreatingCategory,
  updateNote,
} from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryCreateModal from "CategoryCreateModal";
import Editor from "Editor";
import EditorHeader from "EditorHeader";
import NoteSidebar from "NoteSidebar";
import CategorySidebar from "CategorySidebar";
import { useTraceUpdate } from "hooks/useTraceUpdate";

const App = () => {
  const { isCreatingCategory, selectedNoteId, content } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();
  const selectedNoteRef = useRef(null);

  selectedNoteRef.current = { selectedNoteId, content };

  // Initialization
  useEffect(() => {
    // This causes the component `App.js` and then all of its children to re-render
    dispatch(getNotesData());

    const autoSave = () => {
      const selectedNoteId = selectedNoteRef.current.selectedNoteId;
      const content = selectedNoteRef.current.content;

      if (selectedNoteId) {
        dispatch(updateNote({ noteId: selectedNoteId, content }));
      }
    };
    // TODO: change this to 10s for production, but lets keep this 50s for dev since it gets annoying
    setInterval(autoSave, 50000);
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <CategoryCreateModal
        open={isCreatingCategory}
        onCreate={null}
        onCancel={() => {
          dispatch(toggleIsCreatingCategory());
        }}
      />
      <CategorySidebar />
      <NoteSidebar />
      <Layout>
        <EditorHeader />
        <Editor />
      </Layout>
    </Layout>
  );
};
export default App;
