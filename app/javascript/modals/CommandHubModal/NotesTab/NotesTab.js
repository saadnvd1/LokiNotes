import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "modals/CommandHubModal/SearchBar";
import { useSelector } from "react-redux";
import {
  selectAllNotebookNameAndIds,
  selectAllNotes,
} from "selectors/notesSelector";
import Scope from "modals/CommandHubModal/NotesTab/Scope";
import NotePreview from "modals/CommandHubModal/NotesTab/NotePreview";
import Fuse from "fuse.js";
import NotesSearchResults from "modals/CommandHubModal/NotesTab/NotesSearchResults";

const NotesTab = ({ activeTab }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const allNotes = useSelector(selectAllNotes);

  const [results, setResults] = useState([]);

  const fuse = useMemo(
    () =>
      new Fuse(allNotes, {
        keys: ["title", "content"],
        threshold: 0.3,
      }),
    [allNotes]
  );

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);

    if (searchQuery.length > 0) {
      setResults(fuse.search(searchQuery));
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <SearchBar
        activeTab={activeTab}
        placeholder="Find in notes..."
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <NotesSearchResults
        results={results}
        focusedIndex={focusedIndex}
        setFocusedIndex={setFocusedIndex}
        searchQuery={searchQuery}
      />
      <Scope />
      {searchQuery && results.length > 0 && (
        <NotePreview content={results[focusedIndex]?.item.content} />
      )}
    </div>
  );
};

export default NotesTab;
