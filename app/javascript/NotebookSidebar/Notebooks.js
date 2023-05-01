import React from "react";
import { isEmpty } from "lodash";
import SubnotebookRow from "NotebookSidebar/SubnotebookRow";
import NotebookRow from "NotebookSidebar/NotebookRow";
import { getParentNotebooks } from "helpers/notesHelper";

const Notebooks = ({
  menu,
  handleChangeNotebook,
  toggleIsEditing,
  toggleSubmenu,
  selectedNotebookId,
  notebooks,
  collapsed,
}) => {
  const buildNotebook = (notebookId, notebookData) => {
    if (!notebookId) return;
    const isSubnotebook = !!notebookData.parent_notebook_id;

    const hasSubnotebooks = !isEmpty(notebookData.subnotebook_ids);

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
      collapsed,
      notebooks,
      subnotebookIds: notebookData.subnotebook_ids,
    };

    return (
      <React.Fragment key={notebookId}>
        <NotebookRow {...sharedProps} />
        {hasSubnotebooks && <SubnotebookRow {...sharedProps} />}
      </React.Fragment>
    );
  };

  const buildNotebooks = () =>
    getParentNotebooks(notebooks).map(([notebookId, notebookData]) =>
      buildNotebook(Number(notebookId), notebookData)
    );

  return <ul className="menu">{buildNotebooks()}</ul>;
};

export default Notebooks;
