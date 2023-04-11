import React, { useState } from "react";
import { Segmented, Select } from "antd";
import { useSelector } from "react-redux";
import { selectAllNotebookNameAndIds } from "selectors/notesSelector";

const Scope = ({}) => {
  const [scope, setScope] = useState("All");
  const notebooks = useSelector(selectAllNotebookNameAndIds);

  const onChange = (value) => {
    // debugger;
    // if (scope === "Notebook") {
    //   setFilteredNotes(allNotes.filter((note) => note.notebookId === value));
    // } else {
    //   setFilteredNotes(allNotes);
    // }
    //
    // resetToFilteredNotes();
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const generateNotebookScopeOptions = () => {
    return notebooks.map((notebook) => {
      return { label: notebook.name, value: notebook.id };
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Segmented
        options={["All", "Notebook"]}
        value={scope}
        onChange={setScope}
      />
      {scope === "Notebook" && (
        <div style={{ width: "70%" }}>
          <Select
            showSearch
            style={{ width: "100%" }}
            allowClear
            placeholder="Select a notebook to search in"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={generateNotebookScopeOptions()}
          />
        </div>
      )}
    </div>
  );
};

export default Scope;
