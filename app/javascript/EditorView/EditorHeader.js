import React, { useEffect, useRef, useState } from "react";
import { Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "slices/notesSlice";
import { selectCurrentNoteTitleAndId } from "selectors/notesSelector";

const EditorHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const currentNote = useSelector(selectCurrentNoteTitleAndId);
  const [noteTitle, setNoteTitle] = useState(
    currentNote ? currentNote?.title || "Untitled" : ""
  );
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && isEditing) {
        inputRef.current.focus();
      }
    }, 0);
  }, [isEditing]);

  useEffect(() => {
    // We never want to overwrite the title if the user is currently editing it
    if (isEditing) return;

    if (currentNote) {
      setNoteTitle(currentNote.title || "");
    } else {
      setNoteTitle("");
    }
  }, [currentNote]);

  const saveTitle = () =>
    dispatch(updateNote({ noteId: currentNote.id, title: noteTitle }));

  const handleBlur = () => {
    if (noteTitle !== currentNote.title) {
      saveTitle()
        .unwrap()
        .then(() => setIsEditing(false));
    } else {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const inputStyles = {
    border: "none",
    outline: "none",
    fontWeight: "inherit",
    color: "white",
    fontSize: 32,
    background: "transparent",
    padding: 0,
    margin: 0,
    minWidth: "unset",
    width: "100%",
    marginTop: 20,
    cursor: isEditing ? "unset" : "pointer",
  };

  return (
    <Header
      key={currentNote?.id}
      className="EditorHeader"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: "25px",
        paddingLeft: "25px",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}>
        <input
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          style={inputStyles}
          ref={inputRef}
          onBlur={handleBlur}
          onClick={() => setIsEditing(true)}
          readOnly={!isEditing}
          onKeyDown={handleKeyDown}
        />
      </div>
    </Header>
  );
};

export default EditorHeader;
