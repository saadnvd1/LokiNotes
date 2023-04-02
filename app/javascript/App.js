import { Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import {
  getNotesData,
  toggleIsCreatingNotebook,
  updateNote,
  updateSelectedNotebookId,
  updateSelectedNoteId,
} from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import NotebookCreateModal from "NotebookCreateModal";
import Editor from "Editor";
import EditorHeader from "EditorHeader";
import NoteSidebar from "NoteSidebar";
import NotebookSidebar from "NotebookSidebar/NotebookSidebar";
import { useParams, useNavigate } from "react-router-dom";
import { getRedirectUrl } from "helpers/note";
import ZenModeIcon from "components/ZenModeIcon/ZenModeIcon";
import UpgradeModal from "components/UpgradeModal/UpgradeModal";
import { getBillingData, toggleBillingModal } from "slices/billingSlice";

const App = () => {
  const { notebookId, noteId } = useParams();
  const navigate = useNavigate();
  const [isZenMode, setIsZenMode] = useState(false);

  const { billingModalIsOpen } = useSelector((state) => state.billing);
  const { isCreatingNotebook, selectedNoteId, content, selectedNotebookId } =
    useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const selectedNoteRef = useRef(null);

  selectedNoteRef.current = { selectedNoteId, content };

  // Initialization
  useEffect(() => {
    // This causes the component `App.js` and then all of its children to re-render
    dispatch(getBillingData());
    dispatch(getNotesData()).then(() => {
      if (notebookId && noteId) {
        dispatch(
          updateSelectedNotebookId({ notebookId: Number(notebookId) })
        ).then(() =>
          dispatch(updateSelectedNoteId({ noteId: Number(noteId) }))
        );
      }
    });

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

  // This useEffect is for when we update our notes, we want to make sure the URL reflects that so that if the user wants to save that to bookmarks, they can easily access it again
  useEffect(() => {
    // Again, I think this might be too early to decide whether this will scale or not, but it works for now so I'll keep it. I don't see what other routes I might have right now
    navigate(getRedirectUrl(selectedNoteId, selectedNotebookId));
  }, [selectedNoteId, selectedNotebookId]);

  return (
    <Layout style={{ height: "100vh" }}>
      <UpgradeModal
        isOpen={billingModalIsOpen}
        onClose={() => dispatch(toggleBillingModal())}
      />
      <NotebookCreateModal
        open={isCreatingNotebook}
        onCreate={null}
        onCancel={() => {
          dispatch(toggleIsCreatingNotebook());
        }}
      />
      {!isZenMode && (
        <>
          <NotebookSidebar />
          <NoteSidebar />
        </>
      )}
      <Layout>
        <EditorHeader />
        <Editor />
      </Layout>
      <ZenModeIcon onClick={() => setIsZenMode(!isZenMode)} />
    </Layout>
  );
};
export default App;
