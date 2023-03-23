import { Layout } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { getNotesData, updateNote } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import useKeyboardShortcut from "use-keyboard-shortcut";
import CategoryCreateModal from "CategoryCreateModal";
import Editor from "Editor";
import EditorHeader from "EditorHeader";
import NoteSidebar from "NoteSidebar";
import CategorySidebar from "CategorySidebar";

const App = (s) => {
  const { flushHeldKeys } = useKeyboardShortcut(
    ["Escape"],
    (shortcutKeys) => {
      if (isCreatingCategory) {
        setIsCreatingCategory(false);
      }
    },
    {
      overrideSystem: false,
      ignoreInputFields: false,
      repeatOnHold: false,
    }
  );

  // -- STATE
  const [content, setContent] = useState(null);
  const [menu, setMenu] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const { notesData } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const selectedNoteRef = useRef();
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  selectedNoteRef.current = { selectedNoteId, content };

  // -- UseEffects
  // Initialization
  useEffect(() => {
    dispatch(getNotesData());

    const autoSave = () => {
      if (selectedNoteRef.current.selectedNoteId) {
        saveNote(
          selectedNoteRef.current.selectedNoteId,
          selectedNoteRef.current.content
        );
      }
    };
    setInterval(autoSave, 50000);
  }, []);

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData]);

  useEffect(() => {
    if (selectedNoteId) {
      const currentNote = getCurrentNote();

      if (
        currentNote &&
        currentNote.content !== null &&
        currentNote.content !== ""
      ) {
        setContent(currentNote.content);
      }
    }
  }, [selectedNoteId]);

  // -- Menu Related Functions
  const toggleSubmenu = (categoryId) => {
    const menuCopy = menu;
    menuCopy[categoryId].showSubMenu = !menuCopy[categoryId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (categories) => {
    const items = {};

    Object.keys(categories).forEach((categoryId) => {
      items[categoryId] = {
        selected: false,
        showSubMenu: false,
      };
    });

    setMenu(items);
  };

  // -- Category Related Functions
  const handleChangeCategory = (categoryId) => {
    saveBeforeExit();
    setSelectedCategoryId(categoryId);

    // Always select the first note from that category
    if (getCategoryById(categoryId)?.notes[0]) {
      setSelectedNoteId(getCategoryById(categoryId).notes[0]?.id);
    }
  };

  const getCurrentlySelectedCategory = () => {
    if (!notesData) return;

    return getCategoryById(selectedCategoryId);
  };

  const getCategoryById = (id) => {
    return notesData[id];
  };

  const handleCreateCategory = () => {
    setIsCreatingCategory(true);
  };

  // -- Note specific functions
  const getCurrentNote = () => {
    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      return categoryNotes.notes.find((note) => note.id === selectedNoteId);
    }
  };

  const getNotesForSelectedCategory = () => {
    if (!notesData || !selectedCategoryId) return [];

    const categoryNotes = getCurrentlySelectedCategory();

    if (categoryNotes) {
      debugger;
      return categoryNotes.notes.map((note) => ({
        key: note.id,
        label: note.title,
      }));
    }

    return [];
  };

  // When you navigate away to another category or note, we always want to save the note
  const saveNote = (noteId, content) => {
    dispatch(
      updateNote({
        noteId,
        content,
      })
    );
  };

  const saveBeforeExit = () => {
    if (selectedNoteId) saveNote(selectedNoteId, content);
  };

  const handleChangeNote = (e) => {
    saveBeforeExit();
    setSelectedNoteId(Number(e.key));
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <CategoryCreateModal
        open={isCreatingCategory}
        onCreate={null}
        onCancel={() => {
          setIsCreatingCategory(false);
        }}
      />
      {notesData && (
        <CategorySidebar
          selectedCategoryId={selectedCategoryId}
          isCreatingCategory={isCreatingCategory}
          handleCreateCategory={handleCreateCategory}
          toggleSubmenu={toggleSubmenu}
          notesData={notesData}
          handleChangeCategory={handleChangeCategory}
          menu={menu}
        />
      )}
      <NoteSidebar
        selectedNoteId={selectedNoteId}
        handleChangeNote={handleChangeNote}
        notes={getNotesForSelectedCategory()}
      />
      <Layout>
        <EditorHeader currentNote={getCurrentNote()} />
        <Editor
          content={content}
          selectedNoteId={selectedNoteId}
          setContent={setContent}
        />
      </Layout>
    </Layout>
  );
};
export default App;
