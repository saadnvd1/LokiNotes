import { Dropdown } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import React from "react";
import RowText from "NotebookSidebar/RowText";

const ParentRowWithSubs = ({
  classNames,
  handleChangeNotebook,
  notebookId,
  items,
  notebookData,
  toggleSubmenu,
  menu,
}) => {
  return (
    <li
      className={classNames + " parent-menu"}
      onClick={() => handleChangeNotebook(notebookId)}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["contextMenu"]}
      >
        <div className="parent-menu-title">
          <RowText isSubnotebook={false} name={notebookData.name} />
          {!menu[notebookId]?.showSubMenu && (
            <CaretDownFilled onClick={() => toggleSubmenu(notebookId)} />
          )}
          {menu[notebookId]?.showSubMenu && (
            <CaretUpFilled onClick={() => toggleSubmenu(notebookId)} />
          )}
        </div>
      </Dropdown>
    </li>
  );
};

export default ParentRowWithSubs;
