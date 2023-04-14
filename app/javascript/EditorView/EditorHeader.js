import React, { useEffect, useRef, useState } from "react";
import { Header } from "antd/es/layout/layout";
import useNotes from "hooks/useNotes";
import { useDispatch } from "react-redux";
import { createNote, updateNote } from "slices/notesSlice";
import LIcon from "components/LIcon/LIcon";
import { Input } from "antd";

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
};

const EditorHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { currentNote, selectedNotebookId } = useNotes();
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
    console.log("hitting this useEffect");
    if (currentNote) {
      setNoteTitle(currentNote.title || "");
    } else {
      console.log("resetting note title");
      console.log(currentNote);
      setNoteTitle("");
    }
  }, [currentNote]);

  const handleCreateNote = () => {
    dispatch(createNote({ notebookId: selectedNotebookId }));
  };

  const saveTitle = () => {
    return dispatch(updateNote({ noteId: currentNote.id, title: noteTitle }));
  };

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

  // TODO: there's a bug where if you're writing a title and the auto save launches, then it'll empty out the title as you're writing. fix it

  console.log("currentNote", currentNote);
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
      <div style={{ color: "#fff", cursor: "pointer" }}>
        <LIcon
          onClick={handleCreateNote}
          iconName="pencilSquareIcon"
          tooltipText="Create Note"
        />
      </div>
    </Header>
  );
};

export default EditorHeader;
