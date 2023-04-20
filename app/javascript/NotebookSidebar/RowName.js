import {
  FolderIcon,
  MinusIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import NotebookInput from "NotebookSidebar/NotebookInput";
import LBox from "components/LBox/LBox";

const RowName = ({
  name,
  isSubnotebook,
  isEditing,
  notebookId,
  toggleIsEditing,
}) => {
  const getNotebookInput = () => {
    if (isEditing) {
      return (
        <NotebookInput
          name={name}
          notebookId={notebookId}
          toggleIsEditing={toggleIsEditing}
          isEditing={isEditing}
        />
      );
    }
  };

  if (isSubnotebook) {
    return (
      <LBox flexRowStart alignCenter>
        <ChevronRightIcon color="white" height="13" />
        {getNotebookInput()}
        {!isEditing && <span>{name}</span>}
      </LBox>
    );
  }

  return (
    <LBox flexRowStart>
      {!isSubnotebook && <FolderIcon height="16" />}
      <div style={{ width: "100%", marginLeft: isEditing ? 8 : 0 }}>
        {getNotebookInput()}
        {!isEditing && (
          <span style={{ marginLeft: "5px", padding: 0 }}>{name}</span>
        )}
      </div>
    </LBox>
  );
};

export default RowName;
