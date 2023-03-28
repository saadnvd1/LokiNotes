import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { isEmpty, isEqual } from "lodash";
import {
  toggleIsCreatingCategory,
  updateSelectedCategoryId,
} from "slices/notesSlice";
import useNotes from "hooks/useNotes";
import { useDispatch } from "react-redux";
import ParentRowNoSubCats from "CategorySidebar/ParentRowNoSubCats";
import ParentRowWithSubs from "CategorySidebar/ParentRowWithSubs";
import SubcategoryRow from "CategorySidebar/SubcategoryRow";

const CategorySidebar = ({ isCreatingCategory }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  const { selectedCategoryId, notesData } = useNotes();

  const handleCreateCategory = () => {
    dispatch(toggleIsCreatingCategory());
  };

  const handleChangeCategory = (categoryId) => {
    dispatch(updateSelectedCategoryId({ categoryId: Number(categoryId) }));
  };

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData]);

  // -- Menu Related Functions
  const toggleSubmenu = (categoryId) => {
    const menuCopy = menu;
    menuCopy[categoryId].showSubMenu = !menuCopy[categoryId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (categories) => {
    const items = {};
    const categoryIDs = Object.keys(categories);

    // Don't update our menu items if our category IDs have not changed
    // This is necessary since any update to `notesData` i.e. updating a note will cause this function to get hit from the `useEffect` above
    if (isEqual(categoryIDs, Object.keys(menu))) return;

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
      buildCategory(Number(catId), catData)
    );
  };

  const buildCategory = (catId, catData) => {
    if (!catId) return;

    const sharedClassNames = [
      "single-menu-item",
      catId === selectedCategoryId ? "menu-selected" : "",
    ];

    let classNames = sharedClassNames.join(" ");

    const sharedParentProps = {
      handleChangeCategory,
      catId,
      classNames,
      catData,
    };

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
          <ParentRowWithSubs
            {...sharedParentProps}
            items={items}
            menu={menu}
            toggleSubmenu={toggleSubmenu}
          />
          <SubcategoryRow
            catId={catId}
            catData={catData}
            menu={menu}
            buildCategory={buildCategory}
          />
        </div>
      );
    }

    return (
      <ParentRowNoSubCats
        {...sharedParentProps}
        key={catId}
        selectedCategoryId={selectedCategoryId}
      />
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
