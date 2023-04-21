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

const NotebookSidebar = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState({});
  const selectedNotebookId = useSelector(
    (state) => state.notes.selectedNotebookId
  );

  // TODO: in the future, this component really doesn't need to be subscribed to this entire notesData. I'd like to refactor in the future because right now if we update a note and save something like its content, then this component gets re-rendered even though it really doesn't need to
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

  const setupMenuItem = (notebookId, notebookData, isSubnotebook) => {
    return {
      selected: selectedNotebookId === notebookId,
      showSubMenu:
        selectedParentNotebookId === notebookId ||
        notebookData.meta?.show_sub_menu
          ? true
          : false,
      isEditing: false,
    };
  };

  const setupMenuItems = (notebooks) => {
    const items = {};

    Object.entries(notebooks).forEach(([notebookId, notebook]) => {
      items[notebookId] = setupMenuItem(Number(notebookId), notebook, false);

      if (notebook.subnotebooks) {
        Object.entries(notebook.subnotebooks).forEach(
          ([subnotebookId, subnotebook]) => {
            items[subnotebookId] = setupMenuItem(
              Number(subnotebookId),
              subnotebook,
              true
            );
          }
        );
      }
    });

    setMenu(items);
  };

  if (!notesData) return null;

  return (
    <Sider style={{ display: "flex", flexShrink: 0 }}>
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
          <Notebooks
            menu={menu}
            handleChangeNotebook={handleChangeNotebook}
            selectedNotebookId={selectedNotebookId}
            toggleIsEditing={toggleIsEditing}
            toggleSubmenu={toggleSubmenu}
            notesData={notesData}
          />
          <div className="center-div" style={{ marginTop: "8px" }}>
            <LIcon
              onClick={handlecreateNotebook}
              iconName="plusCircleIcon"
              tooltipText="Create Notebook"
            />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <BottomMenu />
        </div>
      </div>
    </Sider>
  );
};

export default NotebookSidebar;
