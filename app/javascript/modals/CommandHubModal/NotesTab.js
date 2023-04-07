import React, { useEffect, useRef, useState } from "react";
import SearchBar from "modals/CommandHubModal/SearchBar";

const NotesTab = ({ activeTab }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBar
        activeTab={activeTab}
        placeholder="Find in notes..."
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default NotesTab;
