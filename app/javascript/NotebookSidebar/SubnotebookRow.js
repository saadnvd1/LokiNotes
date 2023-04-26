import React from "react";

const SubnotebookRow = ({
  buildNotebook,
  menu,
  notebookId,
  notebooks,
  subnotebookIds,
}) => (
  <ul
    className={`submenu ${
      !menu[notebookId]?.showSubMenu ? "display-none" : ""
    }`}
  >
    {subnotebookIds.map((subId) =>
      buildNotebook(Number(subId), notebooks[subId], true)
    )}
  </ul>
);

export default SubnotebookRow;
