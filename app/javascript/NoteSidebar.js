import { Menu } from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";
import { updateSelectedNoteId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import useNotes from "hooks/useNotes";

const NoteSidebar = () => {
  const dispatch = useDispatch();
  const { selectedNoteId, selectedCategoryNotes, saveCurrentNote } = useNotes();

  const handleChangeNote = (e) => {
    dispatch(updateSelectedNoteId({ noteId: Number(e.key) }));
  };

  return (
    <Sider trigger={null} collapsible style={{ color: "white" }}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[String(selectedNoteId)]}
        items={selectedCategoryNotes}
        onClick={(e) => {
          handleChangeNote(e);
        }}
      />
    </Sider>
  );
};

export default NoteSidebar;
