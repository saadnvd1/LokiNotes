import React, { useEffect, useRef, useState } from "react";
import "modals/CommandHubModal/NotebookTab/styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import EmptyResults from "modals/CommandHubModal/NotebookTab/EmptyResults";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import { getRedirectUrl } from "helpers/note";
import { updateSelectedNoteId } from "slices/notesSlice";
import useNotes from "hooks/useNotes";

const isNote = (type) => type === "note";
const isSubnotebook = (type) => type === "subnotebook";
const isNotebook = (type) => type === "notebook";

const getDescription = (type) => {
  if (isNote(type)) {
    return "Note";
  } else if (isSubnotebook(type)) {
    return "Subnotebook";
  } else if (isNotebook(type)) {
    return "Notebook";
  }
};

const getIcon = (type) => {
  if (isNotebook(type) || isSubnotebook(type)) {
    return <FolderIcon height="16" />;
  } else if (isNote(type)) {
    return <DocumentIcon height="16px" />;
  }
};

const NotebookSearchResults = ({ results }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  const dispatch = useDispatch();
  const { goToNote } = useNotes();

  focusedIndexRef.current = focusedIndex;

  const navigateToNote = (result) => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));

    if (isNotebook(result.item.type) || isSubnotebook(result.item.type)) {
      goToNote(result.item.id, null);
    } else if (isNote(result.item.type)) {
      goToNote(result.item.notebookId, result.item.id);
    }
  };

  const handleClick = (index) => {
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
    const resultsElements = document.querySelectorAll(
      ".search-result:not(.empty-results)"
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

  return (
    <div className="search-results">
      {results.length === 0 && <EmptyResults />}
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
              {getIcon(result.item.type)}
              <span className="search-result-name">{result.item.name}</span>
            </div>
            <p className="search-result-info">
              {getDescription(result.item.type)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotebookSearchResults;
