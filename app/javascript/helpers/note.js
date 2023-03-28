export const getRedirectUrl = (noteId, categoryId) => {
  const categoryIdPath = `/categories/${categoryId}`;
  const noteIdPath = `/notes/${noteId}`;
  let redirectUrl = "/";

  if (categoryId) {
    redirectUrl = categoryIdPath;
  }

  if (noteId) {
    redirectUrl += noteIdPath;
  }

  return redirectUrl;
};
