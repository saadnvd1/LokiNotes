import { Menu } from "antd";
import React, { useMemo, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { updateSelectedNoteId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentNotebook } from "selectors/notesSelector";
import { DocumentIcon } from "@heroicons/react/24/solid";

import { isMobile } from "react-device-detect";

const NoteSidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(isMobile);

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
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          minHeight: 0,
        }}
      >
        <div style={{ overflowY: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[String(selectedNoteId)]}
            items={notes}
            onClick={(e) => {
              handleChangeNote(e);
            }}
          />
        </div>
      </div>
    </Sider>
  );
};

export default NoteSidebar;
