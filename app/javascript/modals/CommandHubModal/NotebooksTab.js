import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchBar from "modals/CommandHubModal/SearchBar";
import { useSelector } from "react-redux";
import { selectNotebooksSearchIndex } from "selectors/notesSelector";
import Fuse from "fuse.js";
import NotebookSearchResults from "modals/CommandHubModal/NotebookSearchResults";

const NotebooksTab = ({ activeTab }) => {
  const notebooksSearchIndex = useSelector(selectNotebooksSearchIndex);

  const allResults = useMemo(() => {
    return notebooksSearchIndex.slice(0, 5).map((data) => {
      return { item: { ...data } };
    });
  }, [notebooksSearchIndex]);

  const [results, setResults] = useState(allResults);

  console.log("results", results);

  const fuse = useMemo(
    () =>
      new Fuse(notebooksSearchIndex, {
        keys: ["title", "name"],
        threshold: 0.3,
      }),
    [notebooksSearchIndex]
  );

  const handleSearch = (searchQuery) => {
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
        placeholder="Find in notebooks..."
        handleSearch={handleSearch}
      />
      <NotebookSearchResults results={results} />
    </div>
  );
};

export default NotebooksTab;
