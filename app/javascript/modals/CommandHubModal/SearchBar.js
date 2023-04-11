import React, { useEffect, useRef } from "react";
import { Input } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const SearchBar = ({ handleSearch, activeTab, placeholder, searchQuery }) => {
  const inputRef = useRef(null);
  const { commandHubModalIsOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();

      if (
        searchQuery &&
        searchQuery.length > 0 &&
        inputRef.current.input.value
      ) {
        inputRef.current.setSelectionRange(
          0,
          inputRef.current.input.value.length
        );
      }
    }, 0);
  }, [commandHubModalIsOpen, activeTab]);

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
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
