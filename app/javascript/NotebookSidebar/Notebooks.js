import React from "react";
import { isEmpty } from "lodash";
import SubnotebookRow from "NotebookSidebar/SubnotebookRow";
import NotebookRow from "NotebookSidebar/NotebookRow";

const Notebooks = ({
  menu,
  handleChangeNotebook,
  toggleIsEditing,
  toggleSubmenu,
  selectedNotebookId,
  notesData,
}) => {
  const buildNotebook = (notebookId, notebookData, isSubnotebook = false) => {
    if (!notebookId) return;

    const hasSubnotebooks = !isEmpty(notebookData.subnotebooks);

    const sharedProps = {
      selectedNotebookId,
      handleChangeNotebook,
      notebookId,
      notebookData,
      toggleIsEditing,
      toggleSubmenu,
      menu,
      buildNotebook,
      isSubnotebook,
      hasSubnotebooks,
    };

    return (
      <>
        <NotebookRow {...sharedProps} />
        {hasSubnotebooks && <SubnotebookRow {...sharedProps} />}
      </>
    );
  };

  const buildNotebooks = () => {
    return Object.entries(notesData).map(([notebookId, notebookData]) =>
      buildNotebook(Number(notebookId), notebookData)
    );
  };

  return <ul className="menu">{buildNotebooks()}</ul>;
};

export default Notebooks;
