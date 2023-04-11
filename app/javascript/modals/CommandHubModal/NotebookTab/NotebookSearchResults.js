import React from "react";
import "modals/CommandHubModal/NotebookTab/styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";
import EmptyResults from "modals/CommandHubModal/NotebookTab/EmptyResults";

const isNote = (type) => type === "note";
const isSubnotebook = (type) => type === "subnotebook";
const isNotebook = (type) => type === "notebook";

const NotebookSearchResults = ({ results }) => {
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

  return (
    <div className="search-results">
      {results.length === 0 && <EmptyResults />}
      {results.slice(0, 5).map((result) => (
        <div key={result.item.id} className="search-result">
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
