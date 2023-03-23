import { Menu } from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";

const NoteSidebar = ({ selectedNoteId, handleChangeNote, notes }) => {
  return (
    <Sider trigger={null} collapsible style={{ color: "white" }}>
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
