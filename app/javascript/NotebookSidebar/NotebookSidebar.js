import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { isEmpty, isEqual, difference } from "lodash";
import { updateSelectedNotebookId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import ParentRowNoSubs from "NotebookSidebar/ParentRowNoSubs";
import ParentRowWithSubs from "NotebookSidebar/ParentRowWithSubs";
import SubnotebookRow from "NotebookSidebar/SubnotebookRow";
import LIcon from "components/LIcon/LIcon";
import BottomMenu from "NotebookSidebar/BottomMenu";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";

const NotebookSidebar = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );
  const notesData = useSelector((state) => state.notes.notesData);
  const selectedParentNotebookId = useSelector(
    (state) => state.notes.selectedParentNotebookId
  );

  const handlecreateNotebook = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.CREATE_NOTEBOOK }));
  };

  const handleChangeNotebook = (notebookId) => {
    dispatch(updateSelectedNotebookId({ notebookId: Number(notebookId) }));
  };

  // Setup Menu State
  useEffect(() => {
    if (notesData) {
      setupMenuItems(notesData);
    }
  }, [notesData, selectedParentNotebookId]);

  // -- Menu Related Functions
  const toggleSubmenu = (notebookId) => {
    const menuCopy = menu;
    menuCopy[notebookId].showSubMenu = !menuCopy[notebookId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const setupMenuItems = (notebooks) => {
    const items = {};
    const notebookIDs = Object.keys(notebooks);

    // There might be a more efficient way to do this, but I'm going to leave alone for now since this won't be a lot of updates to make. Will keep a lookout for any slowness though
    notebookIDs.forEach((notebookId) => {
      notebookId = Number(notebookId);

      items[notebookId] = {
        selected: selectedNotebookId === notebookId,
        showSubMenu: selectedParentNotebookId === notebookId,
      };
    });

    setMenu(items);
  };

  const buildNotebooks = () => {
    return Object.entries(notesData).map(([notebookId, notebookData]) =>
      buildNotebook(Number(notebookId), notebookData)
    );
  };

  const buildNotebook = (notebookId, notebookData, isSubNotebook = false) => {
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
        isSubNotebook={isSubNotebook}
      />
    );
  };

  if (!notesData) return null;

  return (
    <Sider
      trigger={null}
      collapsible
      style={{ color: "white" }}
      className="hide-sidebar"
    >
      <ul className="menu">{buildNotebooks()}</ul>
      <div className="center-div" style={{ marginTop: "8px" }}>
        <LIcon
          onClick={handlecreateNotebook}
          iconName="plusCircleIcon"
          tooltipText="Create Notebook"
        />
      </div>
      <BottomMenu />
    </Sider>
  );
};

export default NotebookSidebar;
