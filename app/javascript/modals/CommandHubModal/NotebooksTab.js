import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchBar from "modals/CommandHubModal/SearchBar";

const NotebooksTab = ({ activeTab }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <SearchBar
        activeTab={activeTab}
        placeholder="Find in notebooks..."
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default NotebooksTab;
