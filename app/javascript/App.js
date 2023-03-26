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
import { useTraceUpdate } from "hooks/useTraceUpdate";

const App = () => {
  const { isCreatingCategory, selectedNoteId } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();
  // useTraceUpdate();

  // Initialization
  useEffect(() => {
    // This causes the component `App.js` and then all of its children to re-render
    dispatch(getNotesData());
    // TODO: fix this, because right now it seems to be bugging out
    // const autoSave = () => {
    //     if (selectedNoteRef.current.selectedNoteId) {
    //       saveCurrentNote();
    //     }
    //   };
    //   setInterval(autoSave, 50000);
  }, []);

  debugger;

  return (
    <Layout style={{ height: "100vh" }}>
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
