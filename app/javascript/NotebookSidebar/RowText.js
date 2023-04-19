import { FolderIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { updateNote, updateNotebook } from "slices/notesSlice";
import { useDispatch } from "react-redux";

const RowName = ({
  name,
  isSubnotebook,
  notebookId,
  isEditing,
  toggleIsEditing,
}) => {
  const [nameValue, setNameValue] = useState(name);
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current && isEditing) {
        inputRef.current.focus();
      }
    }, 0);
  }, [isEditing]);

  const saveName = () => {
    return dispatch(updateNotebook({ notebookId, name: nameValue }));
  };

  if (isSubnotebook) {
    return <span>{nameValue}</span>;
  }

  const inputStyles = {
    border: "none",
    outline: "none",
    fontWeight: "inherit",
    color: "white",
    fontSize: 12,
    background: "transparent",
    padding: 0,
    margin: 0,
    minWidth: "unset",
    width: "100%",
    marginTop: 0,
    cursor: isEditing ? "unset" : "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      {!isSubnotebook && <FolderIcon height="16" />}
      <div style={{ width: "100%" }}>
        {isEditing && (
          <input
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            style={inputStyles}
            ref={inputRef}
            onBlur={null}
            onClick={() => setIsEditing(true)}
            onKeyDown={null}
          />
        )}
        {!isEditing && (
          <span style={{ marginLeft: "5px", padding: 0 }}>{name}</span>
        )}
      </div>
    </div>
  );
};

export default RowName;
