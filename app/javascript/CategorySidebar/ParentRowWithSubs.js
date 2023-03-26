import { Dropdown } from "antd";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import React from "react";

const ParentRowWithSubs = ({
  classNames,
  handleChangeCategory,
  catId,
  items,
  catData,
  toggleSubmenu,
  menu,
}) => {
  return (
    <li
      className={classNames + " parent-menu"}
      onClick={() => handleChangeCategory(catId)}
    >
      <Dropdown
        menu={{
          items,
        }}
        trigger={["contextMenu"]}
      >
        <div className="parent-menu-title">
          <span>{catData.name}</span>
          {!menu[catId]?.showSubMenu && (
            <CaretDownFilled onClick={() => toggleSubmenu(catId)} />
          )}
          {menu[catId]?.showSubMenu && (
            <CaretUpFilled onClick={() => toggleSubmenu(catId)} />
          )}
        </div>
      </Dropdown>
    </li>
  );
};

export default ParentRowWithSubs;
