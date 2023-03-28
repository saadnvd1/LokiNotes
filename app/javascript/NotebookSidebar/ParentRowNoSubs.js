import React from "react";

const ParentRowNoSubs = ({
  notebookId,
  handleChangeNotebook,
  notebookData,
  classNames,
}) => {
  return (
    <li
      key={notebookId}
      onClick={() => handleChangeNotebook(notebookId)}
      className={classNames}
    >
      <span>{notebookData.name}</span>
    </li>
  );
};

export default ParentRowNoSubs;
