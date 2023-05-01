export const getRedirectUrl = (noteId, notebookId) => {
  const notebookIdPath = `/notebooks/${notebookId}`;
  const noteIdPath = `/notes/${noteId}`;
  let redirectUrl = "/";

  if (notebookId) {
    redirectUrl = notebookIdPath;
  }

  if (noteId) {
    redirectUrl += noteIdPath;
  }

  return redirectUrl;
};

export const getNotebookById = (selectedParentNotebookId, notesData, id) => {
  if (!notesData) return;

  if (selectedParentNotebookId) {
    return notesData[selectedParentNotebookId].subnotebooks[id];
  }

  return notesData[id];
};

export const getParentNotebooks = (notebooks) => {
  if (!notebooks) return [];

  return Object.entries(notebooks).filter(
    ([_, notebookData]) => !notebookData.parent_notebook_id
  );
};
