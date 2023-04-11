import React, { useEffect, useRef, useState } from "react";
import "modals/CommandHubModal/NotebookTab/styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import EmptyResults from "modals/CommandHubModal/NotebookTab/EmptyResults";
import { useDispatch } from "react-redux";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import useNotes from "hooks/useNotes";

const NotebookSearchResults = ({
  results,
  setFocusedIndex,
  focusedIndex,
  searchQuery,
}) => {
  const focusedIndexRef = useRef(0);
  const dispatch = useDispatch();
  const { goToNote } = useNotes();

  focusedIndexRef.current = focusedIndex;

  const navigateToNote = (result) => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
    goToNote(result.item.notebookId, result.item.id);
  };

  const handleClick = (index) => {
    const result = results[index];
    setFocusedIndex(index);
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
    const resultsElements = document.querySelectorAll(
      ".notes-search-result:not(.empty-results)"
    );

    resultsElements.forEach((element, index) => {
      element.setAttribute("tabindex", 0);
      element.setAttribute("data-index", index);
    });

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [results]);

  console.log("focusedIndex", focusedIndex);

  console.log("results", results);

  return (
    <div className="notes-search-results search-results">
      {searchQuery && results.length === 0 && <EmptyResults />}
      {results.slice(0, 5).map((result, index) => (
        <div
          key={result.item.id}
          className={`search-result ${index === focusedIndex ? "focused" : ""}`}
          onClick={() => handleClick(index)}
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

export default NotebookSearchResults;
