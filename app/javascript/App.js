import { Layout } from "antd";
import React, { useEffect, useRef } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import {
  getNotesData,
  toggleIsCreatingCategory,
  updateNote,
  updateSelectedCategoryId,
  updateSelectedNoteId,
} from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryCreateModal from "CategoryCreateModal";
import Editor from "Editor";
import EditorHeader from "EditorHeader";
import NoteSidebar from "NoteSidebar";
import CategorySidebar from "CategorySidebar/CategorySidebar";
import { useParams, useNavigate } from "react-router-dom";
import { getRedirectUrl } from "helpers/note";

const App = () => {
  const { categoryId, noteId } = useParams();
  const navigate = useNavigate();

  const { isCreatingCategory, selectedNoteId, content, selectedCategoryId } =
    useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const selectedNoteRef = useRef(null);

  selectedNoteRef.current = { selectedNoteId, content };

  // Initialization
  useEffect(() => {
    // This causes the component `App.js` and then all of its children to re-render
    dispatch(getNotesData()).then(() => {
      if (categoryId && noteId) {
        dispatch(
          updateSelectedCategoryId({ categoryId: Number(categoryId) })
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
    navigate(getRedirectUrl(selectedNoteId, selectedCategoryId));
  }, [selectedNoteId, selectedCategoryId]);

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
