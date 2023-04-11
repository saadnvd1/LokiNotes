import React from "react";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import "modals/CommandHubModal/NotebookTab/EmptyResults.css"; // import your custom CSS file

const EmptyResults = () => {
  return (
    <section className="empty-results">
      <div>
        <FaceFrownIcon className="empty-results-icon-svg" />
      </div>
      <p className="empty-results-text">
        Sorry, we couldn't find anything. Try searching for something else.
      </p>
    </section>
  );
};

export default EmptyResults;
