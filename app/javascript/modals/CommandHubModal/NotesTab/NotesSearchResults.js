import React, { useEffect, useRef, useState } from "react";
import "modals/CommandHubModal/NotebookTab/styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import EmptyResults from "modals/CommandHubModal/NotebookTab/EmptyResults";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import useNotes from "hooks/useNotes";
import { ACTIVE_TABS } from "modals/CommandHubModal/constants";

const NotesSearchResults = ({
  results,
  setFocusedIndex,
  focusedIndex,
  searchQuery,
  activeTab,
}) => {
  const { commandHubModalIsOpen } = useSelector((state) => state.modal);
  const focusedIndexRef = useRef(0);
  const dispatch = useDispatch();
  const { goToNote } = useNotes();

  focusedIndexRef.current = focusedIndex;

  const navigateToNote = (result) => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
    goToNote(result.item.notebookId, result.item.id);
  };

  const handleClick = (index) => {
    setFocusedIndex(index);
  };

  const handleDoubleClick = (index) => {
    const result = results[index];
    navigateToNote(result);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((index) =>
        index === 0 ? results.length - 1 : index - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((index) => (index + 1) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const result = results[focusedIndexRef.current];
      navigateToNote(result);
    }
  };

  useEffect(() => {
    // This and "NotebookSearchResults" would collide if we didn't have this here
    // It seems to work without any issues, so I'm going to stick with it
    if (commandHubModalIsOpen && activeTab === ACTIVE_TABS.notes.key) {
      const resultsElements = document.querySelectorAll(
        ".notes-search-results:not(.empty-results)"
      );

      resultsElements.forEach((element, index) => {
        element.setAttribute("tabindex", 0);
        element.setAttribute("data-index", index);
      });

      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", navigateToNote);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [results, activeTab, commandHubModalIsOpen]);

  return (
    <div className="notes-search-results search-results">
      {searchQuery && results.length === 0 && <EmptyResults />}
      {results.slice(0, 5).map((result, index) => (
        <div
          key={`${result.item.id}-${result.item.type}-notes-search-result`}
          className={`search-result ${index === focusedIndex ? "focused" : ""}`}
          onClick={() => handleClick(index)}
          onDoubleClick={() => handleDoubleClick(index)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <DocumentIcon height="16px" />
              <span className="search-result-name">
                {result.item.title || "Untitled"}
              </span>
            </div>
            <p className="search-result-info">{result.item.createdAt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesSearchResults;
