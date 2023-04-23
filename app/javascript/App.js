import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { getNotesData } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import NoteSidebar from "NoteSidebar";
import NotebookSidebar from "NotebookSidebar/NotebookSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { getRedirectUrl } from "helpers/notesHelper";
import ZenModeIcon from "components/ZenModeIcon/ZenModeIcon";
import { getBillingData } from "slices/billingSlice";
import GlobalComponents from "GlobalComponents";
import useGlobalShortcuts from "hooks/useGlobalShortcuts";
import useGoToNote from "hooks/useGoToNote";
import EditorView from "EditorView/EditorView";

const App = () => {
  useGlobalShortcuts();

  const { notebookId, noteId } = useParams();
  const navigate = useNavigate();
  const [isZenMode, setIsZenMode] = useState(false);

  const [goToNote] = useGoToNote();
  const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );

  const dispatch = useDispatch();

  // Initialization
  useEffect(() => {
    // This causes the component `App.js` and then all of its children to re-render
    dispatch(getBillingData());
    dispatch(getNotesData()).then(() => {
      goToNote(notebookId, noteId);
    });
  }, []);

  // This useEffect is for when we update our notes, we want to make sure the URL reflects that so that if the user wants to save that to bookmarks, they can easily access it again
  useEffect(() => {
    if (selectedNoteId || selectedNotebookId) {
      navigate(getRedirectUrl(selectedNoteId, selectedNotebookId));
    }
  }, [navigate, selectedNoteId, selectedNotebookId]);

  return (
    <Layout style={{ height: "100vh" }}>
      <GlobalComponents />
      {!isZenMode && (
        <>
          <NotebookSidebar />
          <NoteSidebar />
        </>
      )}
      <EditorView />
      <ZenModeIcon
        onClick={() => setIsZenMode(!isZenMode)}
        isZenMode={isZenMode}
      />
    </Layout>
  );
};
export default App;
