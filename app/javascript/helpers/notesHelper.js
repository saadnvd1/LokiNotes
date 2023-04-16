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
