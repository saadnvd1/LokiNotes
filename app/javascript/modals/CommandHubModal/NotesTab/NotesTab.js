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
  const [filteredNotes, setFilteredNotes] = useState(allNotes || []);

  const [results, setResults] = useState([]);

  const fuse = useMemo(
    () =>
      new Fuse(filteredNotes, {
        keys: ["title", "content"],
        threshold: 0.3,
      }),
    [filteredNotes]
  );

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);

    if (searchQuery.length > 0) {
      setResults(fuse.search(searchQuery));
    } else {
      setResults([]);
      setFocusedIndex(0);
    }
  };

  // I definitely don't like using useEffect here, but I couldn't find a better way to do this
  // This one is to make sure that when we change the scope or we change the notebook, the search results are updated
  // TODO: maybe come back to this to refactor, but it works, so it's fine
  useEffect(() => {
    setFocusedIndex(0);

    if (searchQuery && searchQuery.length > 0 && filteredNotes.length > 0) {
      setResults(fuse.search(searchQuery));
    } else if (filteredNotes.length === 0) {
      setResults([]);
    }
  }, [filteredNotes]);

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
        activeTab={activeTab}
      />
      <Scope setFilteredNotes={setFilteredNotes} allNotes={allNotes} />
      {searchQuery && results.length > 0 && (
        <NotePreview content={results[focusedIndex]?.item.content} />
      )}
    </div>
  );
};

export default NotesTab;
