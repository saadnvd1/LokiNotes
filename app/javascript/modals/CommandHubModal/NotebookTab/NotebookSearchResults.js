import React, { useEffect, useRef, useState } from "react";
import "modals/CommandHubModal/NotebookTab/styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import EmptyResults from "modals/CommandHubModal/NotebookTab/EmptyResults";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";

const isNote = (type) => type === "note";
const isSubnotebook = (type) => type === "subnotebook";
const isNotebook = (type) => type === "notebook";

const NotebookSearchResults = ({ results }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focusedIndexRef = useRef(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  focusedIndexRef.current = focusedIndex;

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

      dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));

      if (isNotebook(result.item.type)) {
        navigate(`/notebooks/${result.item.id}`);
      } else if (isSubnotebook(result.item.type)) {
        // TODO
      } else if (isNotebook(result.item.type)) {
        // TODO
      }
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

  console.log("focusedIndex", focusedIndex);

  return (
    <div className="search-results">
      {results.length === 0 && <EmptyResults />}
      {results.slice(0, 5).map((result, index) => (
        <div
          key={result.item.id}
          className={`search-result ${index === focusedIndex ? "focused" : ""}`}
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
