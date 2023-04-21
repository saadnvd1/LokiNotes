import { Menu } from "antd";
import React, { useMemo, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { updateSelectedNoteId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentNotebook } from "selectors/notesSelector";
import { DocumentIcon } from "@heroicons/react/24/solid";

const NoteSidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const currentNotebook = useSelector(selectCurrentNotebook);
  const selectedNoteId = useSelector((state) => state.notes.selectedNoteId);

  const handleChangeNote = (e) => {
    dispatch(updateSelectedNoteId({ noteId: Number(e.key) }));
  };

  const notes = useMemo(() => {
    if (currentNotebook) {
      return currentNotebook.notes.map((note) => ({
        key: note.id,
        label: note.title || "Untitled",
        icon: <DocumentIcon height="16px" />,
      }));
    }

    return [];
  }, [currentNotebook]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ color: "white" }}
      className="hide-sidebar"
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[String(selectedNoteId)]}
        items={notes}
        onClick={(e) => {
          handleChangeNote(e);
        }}
      />
    </Sider>
  );
};

export default NoteSidebar;
