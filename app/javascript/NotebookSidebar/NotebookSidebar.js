import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { updateNotebook, updateSelectedNotebookId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import LIcon from "components/LIcon/LIcon";
import BottomMenu from "NotebookSidebar/BottomMenu";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import Notebooks from "NotebookSidebar/Notebooks";
import LBox from "components/LBox/LBox";
import "./NotebookSidebar.css";
import { isMobile } from "react-device-detect";
import Logo from "images/logo.png";
import LogoCollapsed from "images/logo-collapsed.png";

const NotebookSidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(isMobile);
  const [menu, setMenu] = useState({});
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );

  const notebooks = useSelector((state) => state.notes.notebooks);
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
    if (notebooks) {
      setupMenuItems(notebooks);
    }
  }, [notebooks, selectedParentNotebookId]);

  // -- Menu Related Functions
  const toggleSubmenu = (notebookId) => {
    const menuCopy = menu;
    dispatch(
      updateNotebook({
        id: notebookId,
        meta: { show_sub_menu: !menuCopy[notebookId].showSubMenu },
      })
    );
    menuCopy[notebookId].showSubMenu = !menuCopy[notebookId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const toggleIsEditing = (notebookId) => {
    const menuCopy = menu;
    menuCopy[notebookId].isEditing = !menuCopy[notebookId].isEditing;
    setMenu({ ...menuCopy });
  };

  const setupMenuItem = (notebookId, notebookData, isSubnotebook) => ({
    selected: selectedNotebookId === notebookId,
    showSubMenu: !!(
      selectedParentNotebookId === notebookId ||
      notebookData.meta?.show_sub_menu
    ),
    isEditing: false,
  });

  const setupMenuItems = (notebooks) => {
    const items = {};

    Object.entries(notebooks).forEach(([notebookId, notebook]) => {
      items[notebookId] = setupMenuItem(Number(notebookId), notebook, false);
    });

    setMenu(items);
  };

  if (!notebooks) return null;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <LBox flexRow alignCenter justifyCenter mt4>
        <img
          src={collapsed ? LogoCollapsed : Logo}
          style={{
            width: collapsed ? 20 : 150,
            height: collapsed ? 20 : "100%",
            marginTop: collapsed ? 5 : 0,
            marginBottom: collapsed ? 5 : 0,
          }}
        />
      </LBox>
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
          <div className="center-div" style={{ marginTop: "8px" }}>
            <LIcon
              onClick={handlecreateNotebook}
              iconName="folderPlusIcon"
              tooltipText="Create Notebook"
            />
          </div>
          <Notebooks
            menu={menu}
            handleChangeNotebook={handleChangeNotebook}
            selectedNotebookId={selectedNotebookId}
            toggleIsEditing={toggleIsEditing}
            toggleSubmenu={toggleSubmenu}
            notebooks={notebooks}
            collapsed={collapsed}
          />
        </div>
        <div style={{ position: "relative" }}>
          <BottomMenu />
        </div>
      </div>
    </Sider>
  );
};

export default NotebookSidebar;
