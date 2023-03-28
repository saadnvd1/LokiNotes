import { Dropdown } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import React from "react";

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
          <span>{notebookData.name}</span>
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
