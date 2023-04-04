import { FolderIcon } from "@heroicons/react/24/solid";
import React from "react";

const RowName = ({ name, isSubnotebook }) => {
  if (isSubnotebook) {
    return <span>{name}</span>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      <FolderIcon height="16" />
      <span style={{ marginLeft: "5px" }}>{name}</span>
    </div>
  );
};

export default RowName;
