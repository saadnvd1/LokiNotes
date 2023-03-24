import { Layout } from "antd";
import React, { useEffect } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { getNotesData, toggleIsCreatingCategory } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryCreateModal from "CategoryCreateModal";
import Editor from "Editor";
import EditorHeader from "EditorHeader";
import NoteSidebar from "NoteSidebar";
import CategorySidebar from "CategorySidebar";

const App = () => {
  const { isCreatingCategory, selectedNoteId } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();

  // Initialization
  useEffect(() => {
    dispatch(getNotesData());
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
