import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { isEmpty, isEqual, difference } from "lodash";
import {
  toggleIsCreatingNotebook,
  updateSelectedNotebookId,
} from "slices/notesSlice";
import useNotes from "hooks/useNotes";
import { useDispatch } from "react-redux";
import ParentRowNoSubs from "NotebookSidebar/ParentRowNoSubs";
import ParentRowWithSubs from "NotebookSidebar/ParentRowWithSubs";
import SubnotebookRow from "NotebookSidebar/SubnotebookRow";

const NotebookSidebar = ({ isCreatingNotebook }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  const { selectedNotebookId, notesData } = useNotes();

  const handlecreateNotebook = () => {
    dispatch(toggleIsCreatingNotebook());
  };

  const handleChangeNotebook = (notebookId) => {
    dispatch(updateSelectedNotebookId({ notebookId: Number(notebookId) }));
  };

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData]);

  // -- Menu Related Functions
  const toggleSubmenu = (notebookId) => {
    const menuCopy = menu;
    menuCopy[notebookId].showSubMenu = !menuCopy[notebookId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (notebooks) => {
    const items = {};
    const notebookIDs = Object.keys(notebooks);

    // Don't update our menu items if our notebook IDs have not changed
    // This is necessary since any update to `notesData` i.e. updating a note will cause this function to get hit from the `useEffect` above
    if (isEqual(notebookIDs, Object.keys(menu))) return;

    const changeNotebookIds = difference(notebookIDs, Object.keys(menu));

    changeNotebookIds.forEach((notebookId) => {
      items[notebookId] = {
        selected: selectedNotebookId === notebookId,
        showSubMenu: false,
      };
    });

    setMenu(items);
  };

  const buildNotebooks = () => {
    return Object.entries(notesData).map(([notebookId, notebookData]) =>
      buildNotebook(Number(notebookId), notebookData)
    );
  };

  const buildNotebook = (notebookId, notebookData) => {
    if (!notebookId) return;

    const sharedClassNames = [
      "single-menu-item",
      notebookId === selectedNotebookId ? "menu-selected" : "",
    ];

    let classNames = sharedClassNames.join(" ");

    const sharedParentProps = {
      handleChangeNotebook,
      notebookId,
      classNames,
      notebookData,
    };

    if (!isEmpty(notebookData.subnotebooks)) {
      const items = [
        {
          label: "Create Subnotebook",
          key: "1",
          onClick: () => handlecreateNotebook(),
        },
      ];

      return (
        <div key={notebookId}>
          <ParentRowWithSubs
            {...sharedParentProps}
            items={items}
            menu={menu}
            toggleSubmenu={toggleSubmenu}
          />
          <SubnotebookRow
            notebookId={notebookId}
            notebookData={notebookData}
            menu={menu}
            buildNotebook={buildNotebook}
          />
        </div>
      );
    }

    return (
      <ParentRowNoSubs
        {...sharedParentProps}
        key={notebookId}
        selectedNotebookId={selectedNotebookId}
      />
    );
  };

  if (!notesData) return null;

  return (
    <Sider trigger={null} collapsible style={{ color: "white" }}>
      <ul className="menu">{buildNotebooks()}</ul>
      {!isCreatingNotebook && (
        <div style={{ marginLeft: 10 }}>
          <PlusCircleIcon height="24" onClick={handlecreateNotebook} />
        </div>
      )}
      {isCreatingNotebook && (
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

export default NotebookSidebar;
