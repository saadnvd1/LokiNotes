import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dropdown, Input } from "antd";
import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { isEmpty } from "lodash";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import {
  toggleIsCreatingCategory,
  updateSelectedCategoryId,
  updateSelectedNoteId,
} from "slices/notesSlice";
import useNotes from "hooks/useNotes";
import { useDispatch } from "react-redux";

const CategorySidebar = ({ isCreatingCategory }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  const { saveCurrentNote, getCategoryById, selectedCategoryId, notesData } =
    useNotes();

  const handleCreateCategory = () => {
    dispatch(toggleIsCreatingCategory());
  };

  const handleChangeCategory = (categoryId) => {
    dispatch(updateSelectedCategoryId({ categoryId }));
  };

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, []);

  // -- Menu Related Functions
  const toggleSubmenu = (categoryId) => {
    const menuCopy = menu;
    menuCopy[categoryId].showSubMenu = !menuCopy[categoryId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (categories) => {
    const items = {};

    Object.keys(categories).forEach((categoryId) => {
      items[categoryId] = {
        selected: false,
        showSubMenu: false,
      };
    });

    setMenu(items);
  };

  const buildCategories = () => {
    return Object.entries(notesData).map(([catId, catData]) =>
      buildCategory(catId, catData)
    );
  };

  const buildCategory = (catId, catData) => {
    if (!catId) return;

    if (!isEmpty(catData.subcategories)) {
      const items = [
        {
          label: "Create Subcategory",
          key: "1",
          onClick: () => handleCreateCategory(),
        },
      ];

      return (
        <div key={catId}>
          <li
            className={`single-menu-item parent-menu ${
              catId === selectedCategoryId ? "menu-selected" : ""
            }
        `}
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
          <ul
            className={`submenu ${
              !menu[catId]?.showSubMenu ? "display-none" : ""
            }`}
          >
            {Object.entries(catData.subcategories).map(([subId, subData]) =>
              buildCategory(subId, subData)
            )}
          </ul>
        </div>
      );
    }
    return (
      <li
        key={catId}
        className={`single-menu-item ${
          catId === selectedCategoryId ? "menu-selected" : ""
        }`}
        onClick={() => handleChangeCategory(catId)}
      >
        <span>{catData.name}</span>
      </li>
    );
  };

  if (!notesData) return null;

  return (
    <Sider trigger={null} collapsible style={{ color: "white" }}>
      <ul className="menu">{buildCategories()}</ul>
      {!isCreatingCategory && (
        <div style={{ marginLeft: 10 }}>
          <PlusCircleIcon height="24" onClick={handleCreateCategory} />
        </div>
      )}
      {isCreatingCategory && (
        <div style={{ marginLeft: 10 }}>
          <Input
            autoFocus
            allowClear
            placeholder="Name..."
            bordered={false}
            onKeyDown={() => console.log("hello")}
          />
        </div>
      )}
    </Sider>
  );
};

export default CategorySidebar;
