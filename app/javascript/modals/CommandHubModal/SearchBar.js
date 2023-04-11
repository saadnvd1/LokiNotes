import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ handleSearch, activeTab, placeholder }) => {
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
        ref={inputRef}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
