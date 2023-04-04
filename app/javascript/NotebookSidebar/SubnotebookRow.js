import React from "react";

const SubnotebookRow = ({ buildNotebook, notebookData, menu, notebookId }) => {
  return (
    <ul
      className={`submenu ${
        !menu[notebookId]?.showSubMenu ? "display-none" : ""
      }`}
    >
      {Object.entries(notebookData.subnotebooks).map(([subId, subData]) =>
        buildNotebook(Number(subId), subData, true)
      )}
    </ul>
  );
};

export default SubnotebookRow;
