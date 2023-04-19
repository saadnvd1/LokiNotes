import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateNotebook } from "slices/notesSlice";

const NotebookInput = ({ isEditing, toggleIsEditing, notebookId }) => {
  const [nameValue, setNameValue] = useState(name);
  const dispatch = useDispatch();

  const saveName = () => {
    return dispatch(updateNotebook({ notebookId, name: nameValue }));
  };

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && isEditing) {
        inputRef.current.focus();
      }
    }, 0);
  }, [isEditing]);

  const handleBlur = () => {
    if (nameValue !== name) {
      saveName()
        .unwrap()
        .then(() => toggleIsEditing(notebookId));
    } else {
      toggleIsEditing(notebookId);
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
    background: "transparent",
    padding: 0,
    margin: 0,
    minWidth: "unset",
    width: "100%",
    marginTop: 0,
    cursor: isEditing ? "unset" : "pointer",
  };

  return (
    <input
      value={nameValue}
      onChange={(e) => setNameValue(e.target.value)}
      style={inputStyles}
      ref={inputRef}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

export default NotebookInput;
