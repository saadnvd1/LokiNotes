import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import { updateSelectedNotebookId } from "slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import LIcon from "components/LIcon/LIcon";
import BottomMenu from "NotebookSidebar/BottomMenu";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import Notebooks from "NotebookSidebar/Notebooks";

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
    menuCopy[notebookId].showSubMenu = !menuCopy[notebookId].showSubMenu;
    setMenu({ ...menuCopy });
  };

  const toggleIsEditing = (notebookId) => {
    const menuCopy = menu;
    menuCopy[notebookId].isEditing = !menuCopy[notebookId].isEditing;
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
        isEditing: false,
      };
    });

    setMenu(items);
  };

  if (!notesData) return null;

  return (
    <Sider
      trigger={null}
      collapsible
      style={{ color: "white" }}
      className="hide-sidebar"
    >
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
      <BottomMenu />
    </Sider>
  );
};

export default NotebookSidebar;
