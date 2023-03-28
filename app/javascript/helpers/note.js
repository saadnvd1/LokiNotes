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
