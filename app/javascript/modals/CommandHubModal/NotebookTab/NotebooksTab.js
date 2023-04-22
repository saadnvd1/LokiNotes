import React, { useMemo, useState } from "react";
import SearchBar from "modals/CommandHubModal/SearchBar";
import { useSelector } from "react-redux";
import { selectNotebooksSearchIndex } from "selectors/notesSelector";
import Fuse from "fuse.js";
import NotebookSearchResults from "modals/CommandHubModal/NotebookTab/NotebookSearchResults";

const NotebooksTab = ({ activeTab }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const notebooksSearchIndex = useSelector(selectNotebooksSearchIndex);

  const allResults = useMemo(() => notebooksSearchIndex.slice(0, 5).map((data) => ({ item: { ...data } })), [notebooksSearchIndex]);

  const [results, setResults] = useState(allResults);

  const fuse = useMemo(
    () =>
      new Fuse(notebooksSearchIndex, {
        keys: ["title", "name"],
        threshold: 0.3,
      }),
    [notebooksSearchIndex]
  );

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);

    if (searchQuery.length > 0) {
      setResults(fuse.search(searchQuery));
    } else {
      setResults(allResults);
    }
  };

  return (
    <div>
      <SearchBar
        activeTab={activeTab}
        searchQuery={searchQuery}
        placeholder="Find in notebooks..."
        handleSearch={handleSearch}
      />
      <NotebookSearchResults results={results} activeTab={activeTab} />
    </div>
  );
};

export default NotebooksTab;
