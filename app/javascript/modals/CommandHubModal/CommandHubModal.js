import React, { useMemo, useRef, useState } from "react";
import { Modal, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_NAMES, toggleModal } from "slices/modalSlice";
import Draggable from "react-draggable";
import NotebooksTab from "modals/CommandHubModal/NotebookTab/NotebooksTab";
import NotesTab from "modals/CommandHubModal/NotesTab/NotesTab";
import { useHotkeys } from "react-hotkeys-hook";
import { ACTIVE_TABS } from "modals/CommandHubModal/constants";

const CommandHubModal = () => {
  const dispatch = useDispatch();
  const commandHubModalIsOpen = useSelector(
    (state) => state.modals.commandHubModalIsOpen
  );
  const [disabled, setDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useHotkeys(
    "meta+p",
    () => {
      setActiveTab("1");

      if (!commandHubModalIsOpen) {
        dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
      }
    },
    { preventDefault: true, enableOnFormTags: true },
    [commandHubModalIsOpen, activeTab]
  );

  useHotkeys(
    "shift+meta+f",
    () => {
      setActiveTab("2");

      if (!commandHubModalIsOpen) {
        dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
      }
    },
    { preventDefault: true, enableOnFormTags: true },
    [commandHubModalIsOpen, activeTab]
  );

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const handleClose = () => {
    dispatch(toggleModal({ modalName: MODAL_NAMES.COMMAND_HUB }));
  };

  const onChange = (key) => {
    setActiveTab(key);
  };

  // TODO: Add tooltips for keyboard shorcuts and a helpful description
  const items = useMemo(
    () => [
      {
        key: ACTIVE_TABS.notebooks.key,
        label: ACTIVE_TABS.notebooks.label,
        children: <NotebooksTab activeTab={activeTab} />,
      },
      {
        key: ACTIVE_TABS.notes.key,
        label: ACTIVE_TABS.notes.label,
        children: <NotesTab activeTab={activeTab} />,
      },
    ],
    [activeTab]
  );

  return (
    <Modal
      mask={false}
      title={
        <div
          style={{
            width: "100%",
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          // fix eslintjsx-a11y/mouse-events-have-key-events
          // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
          onFocus={() => {}}
          onBlur={() => {}}
          // end
        >
          <div style={{ textAlign: "center" }}>Command Hub</div>
        </div>
      }
      open={commandHubModalIsOpen}
      footer={null}
      onCancel={handleClose}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeTab}
      />
    </Modal>
  );
};

export default CommandHubModal;
