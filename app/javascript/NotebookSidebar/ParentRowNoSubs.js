import React from "react";
import RowName from "NotebookSidebar/RowText";

const ParentRowNoSubs = ({
  notebookId,
  handleChangeNotebook,
  notebookData,
  classNames,
  isSubNotebook,
}) => {
  return (
    <li
      key={notebookId}
      onClick={() => handleChangeNotebook(notebookId)}
      className={classNames}
    >
      <RowName name={notebookData.name} isSubnotebook={isSubNotebook} />
    </li>
  );
};

export default ParentRowNoSubs;
