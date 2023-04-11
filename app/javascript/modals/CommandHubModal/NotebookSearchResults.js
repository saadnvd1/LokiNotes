import React from "react";
import "./styles.css";
import { DocumentIcon, FolderIcon } from "@heroicons/react/24/solid";

const NotebookSearchResults = ({ results }) => {
  console.log("results", results);
  return (
    <div className="search-results">
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
              {(result.item.type === "subnotebook" ||
                result.item.type === "notebook") && <FolderIcon height="16" />}
              {result.item.type === "note" && <DocumentIcon height="16px" />}
              <span className="search-result-name">{result.item.name}</span>
            </div>
            <p className="search-result-info">
              {result.item.type === "note" && `Note`}
              {result.item.type === "subnotebook" && `Subnotebook`}
              {result.item.type === "notebook" && `Notebook`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotebookSearchResults;
