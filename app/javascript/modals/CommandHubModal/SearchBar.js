import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ search, setSearch, activeTab, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  }, [activeTab]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <MagnifyingGlassIcon
        className="search-icon"
        height="24"
        style={{ marginRight: 8 }}
      />
      <Input
        value={search}
        ref={inputRef}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
